import { http } from './AxiosConfiguration';

export default {
    listAll: () => {
        return http.get('rentals');
    },

    listPending: () => {
        return http.get('rentals/pending')
    },

    listReturned: () => {
        return http.get('rentals/returned')
    },

    create: (rental) => {
        return http.post('rentals', rental);
    },

    increaseDeadline: (rental) => {
        return http.put('rentals', rental);
    },

    delete: (id) => {
        return http.delete(`rentals/${id}`);
    },

    findById: (id) => {
        return http.get(`rentals/${id}`);
    },

    returnBook: (id) => {
        return http.put(`rentals/${id}`);
    }
};
