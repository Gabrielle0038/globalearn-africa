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

  if (fields.hp_check) {
    console.warn('[contact] ⚠️  Honeypot rempli — spam ignoré.')
    return { success: true }
  }

  const { firstName, lastName, email, subject, message } = fields

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

  console.log('[contact] Champs validés, objet =', subjectLabel)

  if (!config.resendApiKey) {
    if (import.meta.dev) {
      console.warn('[contact] ⚠️  NUXT_RESEND_API_KEY absente — envoi simulé.')
      return { success: true, simulated: true }
    }
    throw createError({ statusCode: 500, statusMessage: 'Configuration serveur manquante.' })
  }

  const resend = new Resend(config.resendApiKey)
  const internalTo = config.contactEmail || 'contact@globalearn-africa.com'
  const fromAddress = 'GlobalEarn <onboarding@resend.dev>'
  const attachments = attachment
    ? [{ filename: attachment.filename, content: attachment.data.toString('base64') }]
    : undefined

  try {
    console.log('[contact] Envoi vers', internalTo)
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

    if (internalResult.error) {
      throw internalResult.error
    }

    console.log('[contact] ✅ Email envoyé, id =', internalResult.data?.id)
    return { success: true }
  } catch (error: any) {
    console.error('[contact] ❌ Erreur Resend :', error?.message || error)
    throw createError({
      statusCode: 502,
      statusMessage: `Erreur envoi : ${error?.message || 'envoi échoué'}`
    })
  }
})
