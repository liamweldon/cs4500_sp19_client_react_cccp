import {API_ROOT} from '../api-config';

export default class FAQAnswerService {
    static instance = null;
    static getInstance() {
        if (FAQAnswerService.instance === null) {
            FAQAnswerService.instance = new FAQService();
        }
        return this.instance;
    }
    findFAAById = (id) => fetch(`${API_ROOT}/api/faas/${id}`).then((response) => response.json());
    findAllFAAs = () => fetch(`${API_ROOT}/api/faas`).then((response) => response.json());
}