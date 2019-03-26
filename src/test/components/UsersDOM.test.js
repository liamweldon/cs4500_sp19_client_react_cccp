import React from 'react'
import TestRenderer from 'react-test-renderer'
import UserDetails from '../../components/UserDetails'
import UserService from '../../services/UserService'
import users from '../mockData/users.mock.json'
import mockUserService from '../services/mocks/MockUserService'

// Provide an initial service to populate the edit fields. Replicate the one in the container
// for consistency.
let mock_initial_user = {
    user: {
        username: '',
        firstName: '',
        lastName: '',
    }
}

// Mock the service here
const userService = UserService.getInstance();
beforeEach(() => {
    global.fetch = mockUserService(users);
})

// DOM testing code
test('Deletion renders correctly in DOM', () => {

    // Create snapshot of initial services
    return userService.findAllUsers().then(users => {
        let component = TestRenderer
            .create(<UserDetails users={users}
                                 user={mock_initial_user}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        let testInstance = component.root;
        let rows = testInstance.findAllByProps({className : "serviceRow"});
        expect(rows.length).toBe(3);

        // Delete a service via our mocked ServiceService. In the normal case,
        // the ServiceService would modify the database, and the ServiceContainer
        // would then update its state with the new data and re-call the Services
        // funcional component. Here, we simulate that process by updating our
        // mock data via the mock ServiceService and then recreating our
        // functional component with the modified mock data.
        users.deleteUser(123).then(() => {
            component = TestRenderer
                .create(<UserDetails users={users}
                                     user={mock_initial_user}/>);
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();

            let newTestInstance = component.root;
            let newRows = testInstance.findAllByProps({className : "serviceRow"});
            expect(newRows.length).toBe(2);
        }).catch(function(error) {});
    }).catch(function(error) {});
});
