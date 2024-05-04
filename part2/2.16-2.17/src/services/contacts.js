import axios from 'axios'
const url = 'http://localhost:3001/persons'

const fetchData = async () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const pushData = async newContact => {
  const request = axios.post(url, newContact)
  return request.then(response => response.data)
}

const updateData = async (id, object) => {
  const request = axios.put(`${url}/${id}`, object)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

export default { fetchData, pushData, updateData, remove }
