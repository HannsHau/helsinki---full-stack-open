import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const key = import.meta.env.VITE_WEATHER_KEY

const getWeather = ({lat, lon}) => {


  if (lat === null || lon === null) return null

  const url =  baseUrl + "lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + key
  console.log('url: ', url)


  const request =  axios.get(url)
  return request.then(response => {
        const details = response.data
        console.log('Weather: ', details)
        return details
      }).catch(error => {
        console.log('weather failed:' + error)
        return null
      })
}

export default {getWeather}