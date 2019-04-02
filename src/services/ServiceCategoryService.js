import { API_ROOT } from "../api-config";

export default class ServiceCategoryService {
  static instance = null;

  static getInstance() {
    if (ServiceCategoryService.instance === null) {
      ServiceCategoryService.instance = new ServiceCategoryService();
    }
    return this.instance;
  }

  findCategoryById = categoryId =>
    fetch(`${API_ROOT}/api/categories/${categoryId}/`).then(response =>
      response.json());

  findAllCategories = () =>
    fetch(`${API_ROOT}/api/categories`).then(response => response.json());

  findAllServicesForCategory = categoryId =>
     fetch(`${API_ROOT}/api/categories/${categoryId}/services/`).then(response => response.json());
}
