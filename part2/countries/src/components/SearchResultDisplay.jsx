import { useState } from "react"

const SearchResultDisplay = ({allCountries, searchCountry}) => {
    console.log('all countries', allCountries)
    console.log('search input', searchCountry)
    const [filteredCountries, setFilteredCountries] = useState(
      (searchCountry === '')
      ? allCountries
      : allCountries.filter(country => country.name.common.startsWith(searchCountry)))
      
    console.log('filtered countries', filteredCountries)
    if (searchCountry === '') {
      return (
        <div>
          <p>Please input filter to search for country.</p>
        </div>
      )
    }
    else if (filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter.</p>
        </div>
      )
    }
    else if (filteredCountries.length === 0) {
      return (
        <div>
          <p>No results found.</p>
        </div>
      )
    }
    else if (filteredCountries.length > 1) {
      return (
        <div>
          <CountryNameList filteredCountries={filteredCountries} setFilteredCountries={setFilteredCountries}/>
        </div>
      )
    }
    else if (filteredCountries.length === 1) {
      return (
        <div>
          <CountryInfo filteredCountries={filteredCountries} />
        </div>
      )
    }
}
  
const CountryNameList = ({filteredCountries, setFilteredCountries}) => {
    return (
        <div>
            {filteredCountries.map((country) => 
                <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={()=>handleShowCountry(country.name.common, setFilteredCountries)}>show</button>
                </div>
            )}
        </div>
    )
}

const handleShowCountry = (countryName, setFilteredCountries) => {
    console.log(countryName)
    const newFilteredCountries = allCountries.filter(country => country.name.common === countryName)
    setFilteredCountries(newFilteredCountries)
}

const CountryInfo = ({filteredCountries}) => {
    const countryToDisplay = filteredCountries[0]
    console.log('country info', countryToDisplay)
    const countryLanguages = countryToDisplay.languages
    console.log('languages', countryLanguages)
    return (
        <div>
        <h1>{countryToDisplay.name.common}</h1>
        <p>capital {countryToDisplay.capital[0]}</p>
        <p>area {countryToDisplay.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.values(countryLanguages).map((language) => <li key={language}>{language}</li>)}
        </ul>
        <img src={countryToDisplay.flags.png} alt={`${countryToDisplay.name.common} flag`} />
        </div>
    )
}

export default SearchResultDisplay