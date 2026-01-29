const CountryDetail = ({country, countryDetails}) => {

  if (countryDetails === null) {
    return null
  } 

  console.log('Details: ', countryDetails)
  const capital = countryDetails.capital;
  const area = countryDetails.area;
  const languages = countryDetails.languages;
  const list = Object.values(languages).map(language => language)
  const flag = countryDetails.flags.png;

  console.log('Flag: ', flag);


  return (
    <>
    <h1>{country}</h1>
    <li>Capital {capital.map(capital => capital)}</li>
    <li>Area {area}</li>
    <h2>Languages</h2>
    {list.map(language => <li key={language} >{language}</li>)}
    <img src={flag} alt="flag" ></img>
    </>
  )
}

export default CountryDetail