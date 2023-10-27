import { http } from './AxiosConfiguration'

export default {

    listAll: () => {
        return http.get('users')
    },

    create: (user) => {
        return http.post('users', user)
    },

    update: (user) => {
        return http.put('users', user)
    },

    delete: (id) => {
        return http.delete(`users/${id}`)
    },

    findById: (id) => {
        return http.get(`users/${id}`)
    }
}