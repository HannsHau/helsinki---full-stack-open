import axios from 'axios'

const baseUrlgetAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrlgetDetails = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
//https://studies.cs.helsinki.fi/restcountries/api/name/finland

const getAll = () => {
  const request =  axios.get(baseUrlgetAll)

  return request.then(response => {
    console.log(response)
    console.log(response.data)
    const countries = response.data.map(entry => entry.name.common)
    console.log(countries)
    
    return countries
  })
}

const getDetails = (country) => {
  if (country === null) return null

  const url =  baseUrlgetDetails + country.toLowerCase()
  console.log('url: ', url)

  const request =  axios.get(url)
  return request.then(response => {
    const details = response.data
    console.log('Details: ', details)
    return details
  })
}

export default {getAll, getDetails}
