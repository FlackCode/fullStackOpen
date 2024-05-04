import { useState, useEffect } from 'react'
import countriesAPI from './services/countries.js'
import CountryContent from './components/CountryContent.jsx'
const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await countriesAPI.getData()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchData()
  }, [])

  const inputLetter = (event) => {
    const newInputValue = event.target.value.toLowerCase()
    setInputValue(newInputValue)
    const filtered = countries.filter(country => country.name.common.toLowerCase().startsWith(newInputValue))
    if ( newInputValue === '' ) {
      setFilteredCountries([])
    } else if ( filtered.length > 10 ) {
      setFilteredCountries([])
    } else {
      setFilteredCountries(filtered)
    }
    setSelectedCountry(null)
  }

  let Content;

  if (inputValue === '') {
    Content = <p>Enter a country name to begin searching.</p>
  } else if (filteredCountries.length === 0) {
    Content = <p>No countries found.</p>
  } else if (filteredCountries.length > 10) {
    Content = <p>Too many countries to display. Please refine your search.</p>
  } else if (filteredCountries.length == 1) {
    Content = filteredCountries.map((country, index) => (
      <CountryContent country={country} index={index}/>
    ));
  } else {
    Content = filteredCountries.map((country, index) => (
      <div key={index}>
        <p>{country.name.common}</p>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' onClick={() => setSelectedCountry(country)}>View</button>
      </div>
    ));
  }

  countriesAPI.getWeatherData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Find countries</h1>
        <input
          className="border border-gray-300 px-4 py-2 rounded-md w-64"
          placeholder="Enter country name"
          value={inputValue}
          onChange={inputLetter}
        />
      </div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          {inputValue && (
            <div>
              {filteredCountries.length === 0 ? (
                <p className="text-gray-600">No countries found.</p>
              ) : filteredCountries.length > 10 ? (
                <p className="text-gray-600">Too many countries to display. Please refine your search.</p>
              ) : (
                filteredCountries.map((country, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-blue-600 font-medium">{country.name.common}</p>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setSelectedCountry(country)}
                    >
                      View
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="">
          {selectedCountry && <CountryContent country={selectedCountry} />}
        </div>
      </div>
    </div>
  )
}

export default App