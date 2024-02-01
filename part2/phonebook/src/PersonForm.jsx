import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        console.log('new name to add is', newName)
        if (persons.some(person => person.name === newName)){
          alert(newName + ' is already added to phonebook')
        }
        else {
          const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
          }
          console.log(personObject)
          setPersons(persons.concat(personObject))
          alert('Added to phonebook!')
        }
        setNewName('')
        setNewNumber('')
      }
    
      const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
      }
    
      const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
      }

    return (
        <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm