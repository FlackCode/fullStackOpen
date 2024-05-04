import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
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
      if( nameExists ){
        alert('Name is already in your contacts!')
        setNewName('')
      } else {
        const nameObject = { name: newName, number: newNumber }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
  }
  
  const hook = () => {
    const hookHandler = response => {
      setPersons(response.data)
    }
    axios.get('http://localhost:3001/persons').then(hookHandler)
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons filterValue={filterValue} persons={persons} filter={filter}/>
    </div>
  )
}

export default App