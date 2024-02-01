import { useState } from 'react'
import SearchFilter from './SearchFilter'
import PersonForm from './PersonForm'
import PersonsList from './PersonsList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

  ]) 
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h1>Add a new number</h1>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h1>Numbers</h1>
      <PersonsList persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App