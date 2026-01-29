import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import weatherService from './services/weather'

import Filter from './components/Filter'
import Country from './components/Country'
import CountryDetail from "./components/CountryDetails"

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)

  const [selectedCountry, setSelectedCountry] = useState(null)

  const countriesToShow = filter.length > 0 
    ? countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))
    : countries

  const singleCountry = countriesToShow.length === 1 ? countriesToShow[0] : null
  const detailTarget = selectedCountry ?? singleCountry
  const currentCountryName = countryDetails?.name?.common

  useEffect(() => {
    countriesService
      .getAll()
      .then(setCountries)
  }, [])

  useEffect(() => {
    if (!detailTarget) {
      return
    }

    countriesService
      .getDetails(detailTarget)
      .then(details => {
        setCountryDetails(details)
      })
  }, [detailTarget])

  useEffect(() => {

    if(!countryDetails) return

    const latLon = {
      lat: countryDetails.capitalInfo.latlng[0], 
      lon: countryDetails.capitalInfo.latlng[1]};

    weatherService.getWeather(latLon)
      .then(weather => { 
        setWeather(weather)
      })

  }, [countryDetails])

  const handleFilterChange = (event) => {
    setSelectedCountry(null)
    setFilter(event.target.value)
  }

  const handleShow = (country) => {
    setFilter(country)
    setSelectedCountry(country)
  } 

  return (
    <>
      <Filter onChange={(event) => handleFilterChange(event)} text="find countries" value={filter} />
      {(detailTarget && countryDetails && currentCountryName === detailTarget) ?
      <CountryDetail country={detailTarget} countryDetails={countryDetails} weather={weather} /> :
      <Country countries={countriesToShow} handleShow={(country) => handleShow(country)} />
      }
    </>
  )
}

export default App
