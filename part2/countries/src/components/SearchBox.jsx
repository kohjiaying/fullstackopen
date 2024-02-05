const SearchBox = ({searchCountry, setSearchCountry}) => {

    const handleSearchChange = (event) => {
      setSearchCountry(event.target.value)
      console.log(event.target.value)
    }
  
    return (
      <div>
        find countries <input value={searchCountry} onChange={handleSearchChange}></input>
      </div>
    )
}

export default SearchBox