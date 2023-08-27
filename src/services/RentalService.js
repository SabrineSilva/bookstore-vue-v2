import { http } from './AxiosConfiguration'

export default {

    list: () => {
        return http.get('alugueis')
    },

    save: (rentals) => {
        return http.post('aluguel', rentals)
    },

    update: (rentals) => {
        return http.put('aluguel', rentals)
    },

    delete: (rentals) => {
        return http.delete('aluguel', {data: rentals})
    }

}