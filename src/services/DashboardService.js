import { http } from './AxiosConfiguration';

export default {
    listMostRented: () => {
        return http.get('maisalugados');
    }
};
