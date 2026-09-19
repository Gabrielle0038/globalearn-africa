export const useCountries = () => {
  const originCountryKeys = ['cameroon', 'morocco', 'senegal', 'kenya', 'southAfrica']
  const destinationCountryKeys = ['france', 'belgium', 'germany', 'denmark', 'greece', 'estonia']

  return { originCountryKeys, destinationCountryKeys }
}
