import axios from "axios";
const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    console.log('getting all')
    const request = axios.get(baseURL + '/api/all')
    return request.then(response => response.data)
}

export default {getAll}