import React, { useState, useEffect } from 'react'
import countriesAPI from '../services/countries'

const CountryContent = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await countriesAPI.getWeatherData(country.capital)
        setWeather(data)
      } catch (error) {
        console.error( error )
      }
    }
    fetchWeatherData()
  }, [country.capital])

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl">{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
      <h2 className="font-bold text-lg">Languages:</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      {weather && (
        <div>
          <h2 className="font-bold text-lg">Weather in {country.capital}</h2>
          <img src={weather.current.condition.icon} width={64}/>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Wind: {weather.current.wind_kph} km/h</p>
          <p>Humidity: {weather.current.humidity}%</p>
        </div>
      )}
      <div className="p-4">
        <img className="border-black border-2" src={country.flags.svg} width={300} alt="Country Flag" />
      </div>
    </div>
  );
};

export default CountryContent;