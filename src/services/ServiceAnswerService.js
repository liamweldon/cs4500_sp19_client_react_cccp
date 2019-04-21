import { API_ROOT } from "../api-config";

export default class ServiceAnswerService {
  static instance = null;

  static getInstance() {
    if (ServiceAnswerService.instance === null) {
      ServiceAnswerService.instance = new ServiceAnswerService();
    }
    return this.instance;
  }

  findServiceAnswerById = id =>
    fetch(`${API_ROOT}/api/service-answers/${id}`).then(response =>
      response.json()
    );

  findAllServiceAnswers = () =>
    fetch(`${API_ROOT}/api/service-answers`).then(response => response.json());

  deleteServiceAnswer = aId =>
    fetch(`${API_ROOT}/api/service-answers/${aId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .catch(err => err);

  addServiceAnswer = newAnswer =>
    fetch(`${API_ROOT}/api/service-answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnswer)
    }).then(response => response.json());

  editServiceQuestion = (id, newAnswer) =>
    fetch(`${API_ROOT}/api/service-answers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAnswer)
    }).then(response => response.json());
}
