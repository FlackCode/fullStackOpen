import { useEffect, useState } from 'react'
import Notification from './components/Notification.jsx'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts.js'
const App = () => {
  const [notification, setNotification] = useState(null)
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
            showNotification(`Updated ${returnedData.name}'s number successfully.`)
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
          showNotification(`Added ${returnedData.name} successfully.`)
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
        showNotification(`Removed ${person.name} successfully.`)
      })
    }
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000);
  };

  return (
    <div className='p-8'>
      <h2 className='font-bold text-lg'>Phonebook</h2>
      {notification && <Notification notiInfo={notification} />}
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange}/>
      <h3 className='font-bold text-lg'>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h3 className='font-bold text-lg'>Numbers</h3>
      <Persons filterValue={filterValue} persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default App