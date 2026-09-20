import { Resend } from 'resend'
 
const ALLOWED_SUBJECTS = ['info', 'technical', 'partnership', 'other']
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mo
 
const SUBJECT_LABELS: Record<string, string> = {
  info: "Demande d'information",
  technical: 'Problème technique',
  partnership: 'Partenariat',
  other: 'Autre'
}
 
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
 
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
 
  const parts = await readMultipartFormData(event)
  if (!parts) {
    throw createError({ statusCode: 400, statusMessage: 'Formulaire invalide.' })
  }
 
  const fields: Record<string, string> = {}
  let attachment: { filename: string, data: Buffer, type: string } | undefined
 
  for (const part of parts) {
    if (part.name === 'attachment' && part.filename) {
      if (part.data.length > 0) {
        attachment = {
          filename: part.filename,
          data: part.data,
          type: part.type || 'application/octet-stream'
        }
      }
      continue
    }
    if (part.name) {
      fields[part.name] = part.data.toString('utf-8')
    }
  }
 
  console.log('[contact] Nouvelle soumission reçue')
 
  // Honeypot anti-spam : champ invisible qui ne doit jamais être rempli par un humain
  if (fields.hp_check) {
    console.warn('[contact] ⚠️  Honeypot rempli — soumission traitée comme spam et ignorée.')
    // Réponse "succès" silencieuse pour ne pas informer le bot
    return { success: true }
  }
 
  const { firstName, lastName, email, subject, message } = fields
 
  // Le message est optionnel : seuls nom, prénom, email et objet sont obligatoires
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !subject?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Merci de remplir tous les champs obligatoires.' })
  }
 
  if (!isValidEmail(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Adresse email invalide.' })
  }
 
  if (!ALLOWED_SUBJECTS.includes(subject)) {
    throw createError({ statusCode: 400, statusMessage: 'Objet invalide.' })
  }
 
  if (attachment) {
    if (!ALLOWED_FILE_TYPES.includes(attachment.type)) {
      throw createError({ statusCode: 400, statusMessage: 'Format de pièce jointe non autorisé.' })
    }
    if (attachment.data.length > MAX_FILE_SIZE) {
      throw createError({ statusCode: 400, statusMessage: 'La pièce jointe dépasse 5 Mo.' })
    }
  }
 
  const subjectLabel = SUBJECT_LABELS[subject] || subject
  const messageHtml = message?.trim()
    ? message.replace(/\n/g, '<br>')
    : '<em>(aucun message)</em>'
 
  console.log('[contact] Champs validés, objet =', subjectLabel, '| clé Resend présente =', !!config.resendApiKey, '| adresse interne =', config.contactEmail || '(défaut)')
 
  // Mode développement sans clé Resend configurée : on simule l'envoi
  // pour permettre de tester tout le parcours (jusqu'à /merci) en local.
  if (!config.resendApiKey) {
    if (import.meta.dev) {
      console.warn('\n[contact] ⚠️  NUXT_RESEND_API_KEY absente — envoi simulé (mode développement uniquement).')
      console.log('[contact] Contenu qui aurait été envoyé :', {
        firstName, lastName, email, subject: subjectLabel, message, attachment: attachment?.filename
      })
      return { success: true, simulated: true }
    }
    console.error('[contact] ❌ NUXT_RESEND_API_KEY absente en production — impossible d\'envoyer.')
    throw createError({ statusCode: 500, statusMessage: 'Configuration serveur manquante (clé Resend).' })
  }
 
  const resend = new Resend(config.resendApiKey)
  const internalTo = config.contactEmail || 'contact@globalearn-africa.com'
  const fromAddress = config.fromEmail || 'GlobalEarn <onboarding@resend.dev>'
  const attachments = attachment
    ? [{ filename: attachment.filename, content: attachment.data.toString('base64') }]
    : undefined
 
  try {
    console.log('[contact] Envoi de l\'email interne vers', internalTo, 'depuis', fromAddress)
    // Email interne — récapitulatif complet vers l'équipe GlobalEarn
    const internalResult = await resend.emails.send({
      from: fromAddress,
      to: internalTo,
      replyTo: email,
      subject: `[Site GlobalEarn] ${subjectLabel} — ${firstName} ${lastName}`,
      attachments,
      html: `
        <h2>Nouveau message depuis le site GlobalEarn</h2>
        <p><strong>Nom :</strong> ${lastName}</p>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Objet :</strong> ${subjectLabel}</p>
        <p><strong>Message :</strong></p>
        <p>${messageHtml}</p>
        ${attachment ? `<p><em>Pièce jointe : ${attachment.filename}</em></p>` : ''}
      `
    })
    console.log('[contact] ✅ Email interne envoyé, id =', internalResult.data?.id, internalResult.error ? `ERREUR: ${JSON.stringify(internalResult.error)}` : '')
 
    if (internalResult.error) {
      throw internalResult.error
    }
 
    console.log('[contact] Envoi de l\'email de confirmation vers', email)
    // Email de confirmation — accusé de réception vers l'utilisateur
    const confirmResult = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: 'Nous avons bien reçu votre message — GlobalEarn',
      html: `
        <h2>Merci ${firstName}, votre message a bien été reçu</h2>
        <p>Voici un récapitulatif de votre demande :</p>
        <p><strong>Objet :</strong> ${subjectLabel}</p>
        <p><strong>Message :</strong></p>
        <p>${messageHtml}</p>
        <p>Un conseiller GlobalEarn vous répondra sous 48 heures ouvrées.</p>
        <p>— L'équipe GlobalEarn</p>
      `
    })
    console.log('[contact] ✅ Email de confirmation envoyé, id =', confirmResult.data?.id, confirmResult.error ? `ERREUR: ${JSON.stringify(confirmResult.error)}` : '')
 
    if (confirmResult.error) {
      throw confirmResult.error
    }
 
    console.log('[contact] ✅ Les deux emails ont été acceptés par Resend sans erreur.')
    return {
      success: true,
      debug: {
        internalEmailId: internalResult.data?.id || null,
        confirmEmailId: confirmResult.data?.id || null
      }
    }
  } catch (error: any) {
    console.error('[contact] ❌ Erreur envoi Resend :', error?.message || error)
    const isDomainError = error?.message?.includes('domain is not verified') || error?.error?.message?.includes('domain is not verified')
    throw createError({
      statusCode: 502,
      statusMessage: isDomainError
        ? "Le domaine d'envoi n'est pas vérifié sur Resend. Vérifie ton domaine sur resend.com/domains, ou utilise l'adresse de test onboarding@resend.dev en attendant."
        : `Erreur Resend : ${error?.message || 'envoi échoué'}`
    })
  }
})
 