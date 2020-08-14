import axios from 'axios'

const api = axios.create({
    baseURL: 'http://3b-va3.anonymous.mobile.exp.direct:3333'
})

export default api;

