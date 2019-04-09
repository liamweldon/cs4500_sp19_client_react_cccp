import { API_ROOT } from "../api-config";

export default class ServiceCategoryService {
  static instance = null;

  static getInstance() {
    if (ServiceCategoryService.instance === null) {
      ServiceCategoryService.instance = new ServiceCategoryService();
    }
    return this.instance;
  }

  findServiceCategoryById = categoryId =>
    fetch(`${API_ROOT}/api/categories/${categoryId}`).then(response =>
      response.json()
    );
    
  findAllServiceCategories = limit =>
    fetch(`${API_ROOT}/api/categories`).then(response => response.json());
}
