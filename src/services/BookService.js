import { http } from './AxiosConfiguration'

export default {

    listAll: () => {
        return http.get('books')
    },

    create: (book) => {
        return http.post('books', book)
    },

    update: (book) => {
        return http.put('books', book)
    },

    delete: (id) => {
        return http.delete(`books/${id}`)
    },

    findById: (id) => {
        return http.get(`books/${id}`)
    }
}