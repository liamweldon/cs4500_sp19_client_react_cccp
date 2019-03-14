import {API_ROOT} from '../api-config';

export default class ServiceQuestionService {
    static instance = null;
    static getInstance() {
        if (ServiceQuestionService.instance === null) {
            ServiceQuestionService.instance = new ServiceQuestionService();
        }
        return this.instance;
    }
    findServiceQuestionById = (id) =>
        fetch(`${API_ROOT}/api/service-questions/${id}`).then((response) => response.json());
    findAllServiceQuestions = () => fetch(`${API_ROOT}/api/service-questions`).then((response) => response.json());
    deleteServiceQuestion = (id) => fetch(`${API_ROOT}/api/service-questions/${id}`, {method: 'DELETE'}).then((response) => response.json());
}
