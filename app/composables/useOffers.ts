export interface Offer {
  id: string
  price: string
  hasPriceDetail?: boolean
  featured?: boolean
}

export interface ComparisonCheckRow {
  key: string
  essentiel: boolean
  pack360: boolean
  premium: boolean
}

export const useOffers = () => {
  const offers: Offer[] = [
    { id: 'essentiel', price: '49 €', hasPriceDetail: true },
    { id: 'pack360', price: '149 €', hasPriceDetail: true, featured: true },
    { id: 'premium', price: '299 €' }
  ]

  const comparisonCheckRows: ComparisonCheckRow[] = [
    { key: 'avi', essentiel: true, pack360: true, premium: true },
    { key: 'visa', essentiel: false, pack360: true, premium: true },
    { key: 'mobileMoney', essentiel: false, pack360: true, premium: true },
    { key: 'insurance', essentiel: false, pack360: true, premium: true },
    { key: 'housing', essentiel: false, pack360: true, premium: true },
    { key: 'career', essentiel: false, pack360: true, premium: true },
    { key: 'advisor', essentiel: false, pack360: false, premium: true },
    { key: 'offices', essentiel: false, pack360: false, premium: true },
    { key: 'api', essentiel: false, pack360: false, premium: true }
  ]

  return { offers, comparisonCheckRows }
}
