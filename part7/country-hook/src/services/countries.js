import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const get = async (id) => {
  const url = baseUrl + '/name/' + id
  console.log('url: ', url) 
  const response = await axios.get(url)
  console.log('data', response.data)
  return response.data
}

export default { get }