import { API_ROOT } from "../api-config";

export default class ServiceService {
  static instance = null;

  static getInstance() {
    if (ServiceService.instance === null) {
      ServiceService.instance = new ServiceService();
    }
    return this.instance;
  }

  findServiceById = serviceId =>
    fetch(`${API_ROOT}/api/services/${serviceId}/`).then(response =>
      response.json());

  findAllServices = () =>
    fetch(`${API_ROOT}/api/services`).then(response => response.json());

  createService = service => {
    delete service.id;
    return fetch(`${API_ROOT}/api/services`,
    {
      method: 'post',
      body: JSON.stringify(service),
      headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
  };

  updateService = service => {
    return fetch(`${API_ROOT}/api/services/${service.id}`,
    {
      method: 'put',
      body: JSON.stringify(service),
      headers: {'content-type': 'application/json'}
    })
    .then(response => response.json())
  };

  deleteService = id => {
    return fetch(`${API_ROOT}/api/services/${id}`,
    {
      method: 'delete'
    })
  };

}
