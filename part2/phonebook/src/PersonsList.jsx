import { useEffect, useState } from 'react'

const NumberLine = ({person}) => {
    return (
      <p>{person.name} {person.number}</p>
    )
}


const PersonList = ({persons, newFilter}) => {
  const personsToShow = (newFilter === '')
  ? persons
  : persons.filter(person => person.name.startsWith(newFilter))
  console.log('personsToShow', personsToShow)
  return (
      <div>
      {personsToShow.map((person) => <NumberLine key={person.name} person={person}/>)}
      </div>
  )
}

export default PersonList