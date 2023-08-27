import { http } from './AxiosConfiguration'

export default {

    list: () => {
        return http.get('editoras')
    },

    save: (publisher) => {
        return http.post('editora', publisher)
    },

    update: (publisher) => {
        return http.put('editora', publisher)
    },

    delete: (publisher) => {
        return http.delete('editora', {data: publisher})
    }

}