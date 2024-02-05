import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('getting all')
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createPerson = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)   
}

const removePerson = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, personObject) => {
    const request = axios.put(`${baseURL}/${id}`, personObject)
    return request.then(response => response.data)
}

export default {getAll, createPerson, removePerson, updatePerson}