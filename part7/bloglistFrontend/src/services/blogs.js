import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const newComment = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
  return request.then((response) => response.data)
}

const destroy = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, destroy, newComment }
