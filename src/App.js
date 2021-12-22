import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
};

const Contact = (props) => {
  return (
    <div>
      <span>{props.name} {props.phone}</span>
      <button onClick={() => props.onClick(props.id)}>Delete</button>
    </div>
  )
}

const Contacts = (props) => {
  return(
    <div>
      {props.persons.map((person, i) => {
        return <Contact key={i} name={person.name} id={person.id} phone={person.number} onClick={props.onClick} />
      })}
    </div>
  )
};

const PersonForm = ({onSubmit, onChange, newName, onPhoneChange, newPhone}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onChange} value={newName}/>
      </div>
      <div>number: <input onChange = {onPhoneChange} value={newPhone} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
  }, [])

  const handleDelete = (id) => {
    const result = window.confirm(`Are you sure you want to delete resource with id ${id}?`);
    if (result) {
      personService.remove(id)
      alert('Deleted');
      window.location.reload();
    }
    
  };

  const onChange = (e) => {
    setNewName(e.target.value)
  };

  const onPhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const duplicatedName = persons.some((person) => person.name === newName)
    if (!duplicatedName) {
      const newPerson = {name: newName, number:newPhone}
      personService.create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data))
        setNewName('');
        setNewPhone('');
        setSuccessMessage(
          `${newPerson.name} was added to your phonebook`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    } else {
      alert(`name ${newName} already exists`)
    }
  };

  return (
    <div>
      <Notification message={successMessage} />
      <h2>Phonebook</h2>
      <h2>Add a new</h2>
      <PersonForm onSubmit={onSubmit} onChange={onChange} newName={newName} onPhoneChange={onPhoneChange} newPhone={newPhone}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} onClick={handleDelete} />
    </div>
  )
}

export default App