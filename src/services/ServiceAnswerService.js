import {API_ROOT} from '../api-config';

export default class ServiceAnswerService {
    static instance = null;
    static getInstance() {
        if (ServiceAnswerService.instance === null) {
            ServiceAnswerService.instance = new ServiceAnswerService();
        }
        return this.instance;
    }
    findServiceAnswerById = (id) => fetch(`${API_ROOT}/api/service-answers/${id}`).then((response) => response.json());
    findAllServiceAnswers = () => fetch(`${API_ROOT}/api/service-answers`).then((response) => response.json());
}
