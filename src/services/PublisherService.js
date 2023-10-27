import { http } from './AxiosConfiguration';

export default {
    listAll: () => {
        return http.get('publishers?page=1');
    },

    create: (publisher) => {
        return http.post('publishers', publisher);
    },

    update: (publisher) => {
        return http.put('publishers', publisher);
    },

    delete: (id) => {
        return http.delete(`publishers/${id}`);
    },

    findById: (id) => {
        return http.get(`publishers/${id}`);
    }
};
