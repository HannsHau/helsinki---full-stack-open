import { useState, useEffect } from 'react'

import countriesService from './services/countries'

import Filter from './components/Filter'
import Country from './components/Country'
import CountryDetail from "./components/CountryDetails"

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState(null)

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

  const handleFilterChange = (event) => {
    setSelectedCountry(null)
    setFilter(event.target.value)
  }

  const handleShow = (country) => {
    console.log('WEATHER_KEY:', import.meta.env.VITE_WEATHER_KEY)
    setFilter(country)
    setSelectedCountry(country)
  } 

  return (
    <>
      <Filter onChange={(event) => handleFilterChange(event)} text="find countries" value={filter} />
      {(detailTarget && countryDetails && currentCountryName === detailTarget) ?
      <CountryDetail country={detailTarget} countryDetails={countryDetails} /> :
      <Country countries={countriesToShow} handleShow={(country) => handleShow(country)} />
      }
    </>
  )
}

export default App
