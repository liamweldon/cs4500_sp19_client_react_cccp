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

    createUser = user => {
        return fetch(`${API_ROOT}/api/users`,
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'}
            })
            .then(response => response.json())
    };

    updateUser = user =>
        fetch(`${API_ROOT}/api/users/${user.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {'content-type': 'application/json'}
            })
            .then(response => {let rv = response.json();
                                delete rv.businessAcceptedPaymentsDirect;
                                return rv;})

    deleteUser = id => {
        return fetch(`${API_ROOT}/api/users/${id}`,
            {
                method: 'DELETE',
            })
    }
}
