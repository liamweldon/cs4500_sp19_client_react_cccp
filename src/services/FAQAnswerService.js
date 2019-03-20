import {API_ROOT} from '../api-config';

export default class FAQAnswerService {
    static instance = null;
    static getInstance() {
        if (FAQAnswerService.instance === null) {
            FAQAnswerService.instance = new FAQAnswerService();
        }
        return this.instance;
    }
    findFAAById = (id) => fetch(`${API_ROOT}/api/faas/${id}`).then((response) => response.json());
    findAllFAAs = () => fetch(`${API_ROOT}/api/faas`).then((response) => response.json());
    addFAA = (newAnswer) =>
        fetch(`${API_ROOT}/api/faas/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnswer)
        }).then((response) => response.json());

    editFAA = (id, newAnswer) =>
        fetch(`${API_ROOT}/api/faas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnswer)
        }).then((response) => response.json());
}