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

      deleteServiceAnswer = (qId, aId) =>
        fetch(`${API_ROOT}/api/service-questions/${qId}/sas/${aId}`, {
          method: "DELETE"
        }).then(response => response.json()).catch(err => err);

      addServiceAnswer = (qId, newAnswer) =>
        fetch(`${API_ROOT}/api/service-questions/${qId}/sas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnswer)
        }).then(response => response.json());

      editServiceAnswer = (id, newAnswer) =>
        fetch(`${API_ROOT}/api/service-answers/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnswer)
        }).then(response => response.json());
}
