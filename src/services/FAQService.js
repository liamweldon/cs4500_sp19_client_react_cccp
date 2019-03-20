import {API_ROOT} from '../api-config';

export default class FAQService {
  static instance = null;
  static getInstance() {
    if (FAQService.instance === null) {
      FAQService.instance = new FAQService();
    }
    return this.instance;
  }

  addFAQ = (newQuestion) =>
    fetch(`${API_ROOT}/api/faqs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    }).then((response) => response.json());

  editFAQ = (id, newQuestion) =>
    fetch(`${API_ROOT}/api/faqs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuestion)
    }).then((response) => response.json());
  findFAQById = (id) => fetch(`${API_ROOT}/api/faqs/${id}`).then((response) => response.json());
  deleteFAQ = (id) => fetch(`${API_ROOT}/api/faqs/${id}`, {method: 'DELETE'}).then((response) => response.json());
  findAllFAQs = () => fetch(`${API_ROOT}/api/faqs`).then((response) => response.json());
  linkFAAtoFAQ = (faaID, faqID) => fetch(`${API_ROOT}/api/faqs/${faqID}/faas/${faaID}`).then(response => response.json());
}
