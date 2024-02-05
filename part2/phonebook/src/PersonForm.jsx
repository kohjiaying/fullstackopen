import { useState } from 'react'
import PersonServices from './services/persons'

const PersonForm = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        console.log('button clicked', event.target)
        console.log('new name to add is', newName)
        if (persons.some(person => person.name === newName)){
          if (window.confirm(newName + ' is already added to phonebook. Replace the old number with the new one?')) {
            const personToUpdate = persons.filter(person => person.name === newName)
            const updatedPerson = personToUpdate[0]
            const personObject = {...updatedPerson, number:newNumber}
            const personId = personToUpdate[0].id
            console.log('personToUpdate', personObject)
            console.log('personId', personId)
            PersonServices
              .updatePerson(personId, personObject)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
                setNewName('')
                setNewNumber('')
              })
          }

        }
        else {
          const personObject = {
            name: newName,
            number: newNumber,
            id: (persons.length + 1).toString()
          }
          PersonServices
            .createPerson(personObject)
            .then(returnedPerson => {
              setPersons(persons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              alert('successfully added to phonebook!')
          })
          
        }
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