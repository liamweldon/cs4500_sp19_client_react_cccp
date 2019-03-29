import React from 'react'
import users from '../mockData/users.mock.json'
import UserService from '../../services/UserService'
import mockUserService from "./mocks/MockUserService"

const test_new_user = {
    "id": 555,
    "username": "alice4",
    "password": "alice3",
    "firstName": "Alice3",
    "lastName": "Wonderland3"
};

// Service mocking code
const userService = UserService.getInstance();

// Mock the service here
beforeAll(() => {
    global.fetch = mockUserService(users);
});

// Test service mocking code behaves properly
test('Test that finding all users works properly', () => {
    return userService.findAllUsers().then(users => {
        expect(users).toBeDefined();
        expect(users).toHaveLength(3);
        expect(users[0].id).toBe(123);
        expect(users[1].id).toBe(234);
        expect(users[2].id).toBe(345);
    });
});

test('Test that creation works properly', () => {
    return userService.createUser(test_new_user).then(user => {

        expect(user).toBeDefined();
        expect(user.id).toBe(555);

        expect(users).toBeDefined();
        expect(users).toHaveLength(4);
        expect(users[0].id).toBe(123);
        expect(users[1].id).toBe(234);
        expect(users[2].id).toBe(345);
        expect(users[3].id).toBe(555);
    });
});

test('Test that delete works properly', () => {
    userService.deleteUser(123).then(user => {

        expect(user).toBeDefined();
        expect(user.id).toBe(555);

        expect(users).toBeDefined();
        expect(users).toHaveLength(3);
        expect(users[0].id).toBe(234);
        expect(users[1].id).toBe(345);
        expect(users[2].id).toBe(555);
    });
});