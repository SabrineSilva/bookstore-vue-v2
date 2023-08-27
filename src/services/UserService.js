import { http } from './AxiosConfiguration'

export default {

    list: () => {
        return http.get('usuarios')
    },

    save: (users) => {
        return http.post('usuario', users)
    },

    update: (users) => {
        return http.put('usuario', users)
    },

    delete: (users) => {
        return http.delete('usuario', {data: users})
    }

}