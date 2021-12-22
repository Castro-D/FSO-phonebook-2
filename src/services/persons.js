const BASE_URL = 'http://localhost:3001/api/persons'

const getAll = () => {
  return fetch(BASE_URL)
    .then((r) => r.json())
}

const create = newPerson => {
  return fetch('http://localhost:3001/api/persons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson),
  })
  .then((r) => r.json())
}

const remove = (id) => {
  return fetch(`http://localhost:3001/api/persons/${id}`, {
    method: 'DELETE',
  })
}

export default { 
  getAll,
  create,
  remove
}