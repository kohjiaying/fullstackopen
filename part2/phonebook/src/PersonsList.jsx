const NumberLine = ({person}) => {
    return (
      <p>{person.name} {person.number}</p>
    )
  }

const PersonList = ({persons, newFilter}) => {
    const personsToShow = (newFilter == '')
    ? persons
    : persons.filter(person => person.name.startsWith(newFilter))
    return (
        <div>
        {personsToShow.map((person) => <NumberLine key={person.name} person={person}/>)}
        </div>
    )
}

export default PersonList