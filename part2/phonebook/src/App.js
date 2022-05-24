import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      
  }, [])
  const namesToShow = showAll
    ? persons
    : persons.filter(person=>person.name.toLowerCase().includes(filterValue.toLowerCase()))
  
    console.log(persons)
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)
    console.log(persons)

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const samePerson = persons.find(person=>person.name===newName)
    if (samePerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace
      the old number with a new one?`)) {
        
        personService
        .update(samePerson.id,nameObject)
        .then(response => {
          setPersons(persons.map(person=>person.id !== samePerson.id ? person: response.data))
          setNewName('')
        setNewNumber('')
        setNotification({message:`Changed ${nameObject.name}`, type:'noti'})
        setTimeout(()=>{
            setNotification(null)
          }, 3000)
      })
      .catch(error=>{
          setNotification({message:`Information of ${nameObject.name} has already been removed from the server`, type:'error'})
          setTimeout(()=>{
            setNotification(null)
          }, 3000)
          setPersons(persons.filter(person=>person.id !== samePerson.id))
      })
      }
    } else {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotification({message:`Added ${nameObject.name}`, type:'noti'})
        setTimeout(()=>{
        setNotification(null)
      }, 3000)
      })
      .catch(error=>{
        setNotification({message:error.response.data.error, type:'error'})
        setTimeout(()=>{
          setNotification(null)
        }, 3000)
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


  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const handleDelete = (event) => {
    console.log(event.target.value)
    if (window.confirm(`Do you want to delete ${event.target.value}`)){
      personService
      .deletePerson(event.target.id)
      .then(deletedPerson=>setPersons(persons.filter(person=>person.id !== event.target.id)))
      
      
  
    }
   
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter filterValue={filterValue} handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App