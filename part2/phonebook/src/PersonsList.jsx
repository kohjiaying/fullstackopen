import PersonServices from './services/persons'

const handleDeletePerson = (id, setPersons, persons, setErrorMessage) => {
  const personToDelete = persons.filter(person => person.id === id)
  console.log('Person Object to delete', personToDelete)
  const personId = personToDelete[0].id
  const personName = personToDelete[0].name
  if (window.confirm(`Delete ${personName}?`)) {
    console.log(personId)
    PersonServices
      .removePerson(personId)
    setErrorMessage(`${personName} successfully deleted!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setPersons(persons.filter(person => person.id !== personId))
  }
}

const NumberLine = ({person, setPersons, persons, setErrorMessage}) => {
    return (
      <div>
        <p>{person.name} {person.number}</p> 
        <button onClick={()=> handleDeletePerson(person.id, setPersons, persons, setErrorMessage)} >delete</button>
      </div>
    )
}


const PersonList = ({persons, newFilter, setPersons, setErrorMessage}) => {
  const personsToShow = (newFilter === '')
  ? persons
  : persons.filter(person => person.name.startsWith(newFilter))
  console.log('personsToShow', personsToShow)
  return (
      <div>
      {personsToShow.map((person) => <NumberLine key={person.name} person={person} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage}/>)}
      </div>
  )
}

export default PersonList