import { API_ROOT } from '../api-config';

export default class ServiceService {
    static instance = null;
    static getInstance() {
        if(ServiceService.instance === null) {
            ServiceService.instance = new ServiceService()
        }
        return this.instance
    }
    findServiceById = serviceId =>
        fetch(`${API_ROOT}/api/services/${serviceId}/`)
            .then(response => response.json())
    findAllServices = () =>
        fetch(`${API_ROOT}/api/services`)
            .then(response => response.json())
}