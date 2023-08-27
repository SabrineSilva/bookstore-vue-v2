import { http } from './AxiosConfiguration'

export default {

    list: () => {
        return http.get('livros')
    },

    save: (books) => {
        return http.post('livro', books)
    },

    update: (books) => {
        return http.put('livro', books)
    },

    delete: (books) => {
        return http.delete('livro', {data: books})
    }

}