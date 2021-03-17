import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ country, handleCountryChange }) => {
  return (
    <div className='filter'>
      <label>Find countries </label>
      <input
        value={country}
        onChange={handleCountryChange}
        autoFocus={true}
        placeholder='enter a country name'
        spellCheck={false} />
    </div>
  )
}

const FilteredCountries = ({ countries, handleShow }) => {
  // Function used to fire the show in App component by clicking the button
  const selectCountry = (country) => {
    return () => handleShow(country)
  }

  return (
    <div className='boxes'>
      {countries.map(country => <p key={country.numericCode}>{country.name}  <Button handleShow={selectCountry(country)} /></p>)}
    </div>
  )
}

const Country = ({ country }) => {

  const [load, setLoad] = useState(false)
  const [weather, setWeather] = useState({
    weather: [{}],
    main: {},
    wind: {},
  })


  useEffect(() => {
    // I will use the API from https://openweathermap.org/ instead of https://weatherstack.com/
    const accessKey = process.env.REACT_APP_API_KEY
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${accessKey}&units=metric`
    axios
      .get(URL)
      .then((response) => {
        setLoad(true)
        setWeather(response.data)
      })
  }, [country.capital])

  return (

    <div className='boxes'>
      <h2>{country.name}</h2>
      <p><strong>Capital: </strong>{country.capital}</p>
      <p><strong>Population: </strong>{country.population}</p>
      <Languages country={country} />
      <img
        src={country.flag}
        alt="National flag"
        width="150px"
        high="100px" />

      {load && <Weather
        country={country}
        data={weather} />}
    </div>
  )
}

const Weather = ({ country, data }) => {
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p><strong>description: </strong>{data.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
      <p><strong>temperature: </strong>{data.main.temp}</p>
      <p><strong>wind speed: </strong>{data.wind.speed}</p>
    </div>
  )
}
const Languages = ({ country }) => {
  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}><em>{language.name}</em></li>)}
      </ul>
    </div>
  )
}

const Button = ({ handleShow }) => {
  return <button onClick={handleShow}>show</button>
}

const App = () => {
  const [country, setCountry] = useState('')
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesData(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const show = (selectedCountry) => {
    setCountriesData([selectedCountry])
  }

  // Function used to display countries bases on the number of countries
  const filterCountry = () => {
    return country && (
      filteredArray.length === 0
        ? <strong>There is no match</strong>
        : filteredArray.length === 1
          ? <Country country={filteredArray[0]} />
          : filteredArray.length <= 10
            ? <FilteredCountries
              countries={filteredArray}
              handleShow={show} />
            : <strong>Too many matches, specify another filter</strong>)
  }

  //Filter countries bases on input from filter
  const regex = RegExp(country, 'i')
  const filteredArray = countriesData.filter(country => regex.test(country.name))


  return (
    <div>
      <h1>Around The World</h1>
      <hr />

      <Filter
        country={country}
        handleCountryChange={handleCountryChange} />

      {filterCountry()}

    </div>
  )
}

export default App;
