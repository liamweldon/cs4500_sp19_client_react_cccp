import {API_ROOT} from '../api-config';

export default class FAQService {
  static instance = null;
  static getInstance() {
    if (FAQService.instance === null) {
      FAQService.instance = new FAQService();
    }
    return this.instance;
  }
  findFAQById = (id) => fetch(`${API_ROOT}/api/faqs/${id}`).then((response) => response.json());
  deleteFAQ = (id) => fetch(`${API_ROOT}/api/faqs/${id}`, {method: 'DELETE'}).then((response) => response.json());
  findAllFAQs = () => fetch(`${API_ROOT}/api/faqs`).then((response) => response.json());
}
