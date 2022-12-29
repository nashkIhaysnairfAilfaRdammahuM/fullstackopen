import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })

      // axios
      //   .post('http://localhost:3001/persons', nameObject)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   })
      
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={'filter shown with'} filterValue={filter} filterHandler={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameHandler={handleNewName} numberValue={newNumber} numberHandler={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App