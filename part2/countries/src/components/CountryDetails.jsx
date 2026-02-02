const CountryDetail = ({country, countryDetails, weather}) => {

  if (countryDetails === null) {
    return null
  } 

  console.log('Details: ', countryDetails)
  const capital = countryDetails.capital
  const area = countryDetails.area
  const languages = countryDetails.languages
  const list = Object.values(languages).map(language => language)
  const flag = countryDetails.flags.png

  const lat = countryDetails.capitalInfo.latlng[0]
  const lon = countryDetails.capitalInfo.latlng[1]

  console.log('Flag: ', flag);

  // Temperature Celsius
  // Wind m/s
  const temperature = weather?.current?.temp
  const wind = weather?.current?.wind_speed

  console.log('Temperature: ', temperature, ' Celsius, ', 'Wind: ', wind, ' m/s');

  const icon = weather?.current?.weather[0]?.icon;
  console.log('Try to get icon: ', icon);

  const iconUrl = 'https://openweathermap.org/payload/api/media/file/' + icon + '.png'
  console.log('from ', iconUrl);


  return (
    <>
    <h1>{country}</h1>
    <li>Capital {capital.map(capital => capital)}</li>
    <li>Area {area}</li>
    <h2>Languages</h2>
    {list.map(language => <li key={language} >{language}</li>)}
    <img src={flag} alt="flag" ></img>
    <li>{lat} N {lon} E </li><br></br>
    <li>Temperature: {temperature} Celsius</li>
    <img src={iconUrl} alt='weather icon' ></img>
    <li>Wind: {wind} m/s</li>
    </>
  )
}

export default CountryDetail