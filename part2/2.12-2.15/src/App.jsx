import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts.js'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const filter = persons.filter((person) => person.name.toLowerCase().startsWith(filterValue.toLowerCase()))
  
  const handleFilterChange = (event) => {
      setFilterValue(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
      event.preventDefault()
      const nameExists = persons.map((person) => person.name).includes(newName)
      const person = persons.find(pers => pers.name === newName)
      if( nameExists ){
        const confirmation = window.confirm(`${newName} is already in your contacts, replace the old number with a new one?`)
        if (confirmation) {
          const changedPerson = { ...person, number: newNumber }
          contactService.updateData(person.id, changedPerson)
          .then(returnedData => {
            setPersons(persons.map(person => (person.id === returnedData.id ? returnedData : person)))
            setNewName('')
            setNewNumber('')
          }) 
        } else {
          setNewName('')
        }
      } else {
        const nameObject = { name: newName, number: newNumber, id: String(persons.length + 1 )}
        contactService.pushData(nameObject).then(returnedData => {
          setPersons(persons.concat(returnedData))
          setNewName('')
          setNewNumber('')
        })
      }
  }
  
  const hook = () => {
    contactService.fetchData().then(data => setPersons(data))
  }
  useEffect(hook, [])

  const deleteContact = person => {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (confirmed) {
      contactService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(pers => pers.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons filterValue={filterValue} persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default App