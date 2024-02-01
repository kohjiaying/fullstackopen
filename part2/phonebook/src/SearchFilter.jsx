const SearchFilter = ({newFilter, setNewFilter}) => {
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
      }
    return (
        <div>filter shown with <input value={newFilter} onChange={handleFilterChange}/></div>
    )
}

export default SearchFilter