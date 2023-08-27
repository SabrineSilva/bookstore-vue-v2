import axios from 'axios'

export const http = axios.create({
    baseURL:'http://wdaw.hopto.org:8185/api/'
})