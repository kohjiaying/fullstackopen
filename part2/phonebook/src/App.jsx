import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter'
import PersonForm from './PersonForm'
import PersonsList from './PersonsList'
import PersonServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    PersonServices
      .getAll()
      .then(initialResult => {
        console.log('initalResult', initialResult)
        setPersons(initialResult)
    })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h1>Add a new number</h1>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h1>Numbers</h1>
      <PersonsList persons={persons} setPersons={setPersons} newFilter={newFilter} />
    </div>
  )
}

export default App