import { useEffect, useState } from 'react'
import SearchFilter from './SearchFilter'
import PersonForm from './PersonForm'
import PersonsList from './PersonsList'
import PersonServices from './services/persons'
import './index.css'

const Notification = ({ message, isColorError }) => {
  if (message === '') {
    return null 
  }
  else if (message === null) {
    return null 
  }
  return (
    <div className={isColorError? 'redError':'greenError'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isColorError, setColorError] = useState(false)

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
      <Notification message={errorMessage} isColorError={isColorError}/>
      <PersonForm persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setColorError={setColorError}/>
      <h1>Numbers</h1>
      <PersonsList persons={persons} setPersons={setPersons} newFilter={newFilter} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App