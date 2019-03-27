import React from 'react'
import TestRenderer from 'react-test-renderer'
import UserDetails from '../../components/UserDetails'
import UserService from '../../services/UserService'
import users from '../mockData/users.mock.json'
import mockUserService from '../services/mocks/MockUserService'

const userService = UserService.getInstance();
beforeEach(() => {
    global.fetch = mockUserService(users);
})

// Provide a new service to insert
const test_new_user = {
    "id": 555,
    "username": "alice4",
    "password": "alice3",
    "firstName": "Alice3",
    "lastName": "Wonderland3"
};

// Provide an initial service to populate the edit fields. Replicate the one in the container
// for consistency.
let mock_initial_user = {
    user: {
        username: '',
        firstName: '',
        lastName: '',
    }
}

// Snapshot testing code
test('Creation renders properly in DOM', () => {

    // Create snapshot of initial services
    return userService.findAllUsers().then(users => {
        let component = TestRenderer
            .create(<UserDetails users={users}
                           user={mock_initial_user}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // Create a new service via our mocked ServiceService. In the normal case,
        // the ServiceService would modify the database, and the ServiceContainer
        // would then update its state with the new data and re-call the Services
        // funcional component. Here, we simulate that process by updating our
        // mock data via the mock ServiceService and then recreating our
        // functional component with the modified mock data.
        userService.createUser(test_new_user).then(user => {
            component = TestRenderer
                .create(<UserDetails users={users}
                               user={mock_initial_user}/>);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
        }).catch(function (error) {
        });
    }).catch(function (error) {
    });
});