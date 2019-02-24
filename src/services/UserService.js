import {API_ROOT} from '../api-config';

export default class UserService {
    static instance = null;
    static getInstance() {
        if (UserService.instance === null) {
            UserService.instance = new UserService();
        }
        return this.instance;
    }
    findUserById = (userId) => fetch(`${API_ROOT}/api/users/${userId}`).then((response) => response.json());
    findAllUsers = () => fetch(`${API_ROOT}/api/users`).then((response) => response.json());
}
