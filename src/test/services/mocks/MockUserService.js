import React from 'react';
import {API_ROOT} from "../../../api-config";

const mockUserService = (s) => jest.fn().mockImplementation((url, config) => {
    if (!config) {

        if (url.indexOf(`${API_ROOT}/api/users`) != -1) {
            return new Promise((resolve, reject) => {
                resolve({
                    json: function () {
                        return s;
                    }
                })
            });
        }
    } else if (config.method === 'POST') {

        let user = JSON.parse(config.body);
        user.id = 555;
        s.push(user);
        return new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return user;
                }
            })
        });
    } else if (config.method === 'DELETE') {

        if (url.indexOf(`${API_ROOT}/api/users/123`) != -1) {
            delete s[0];
            return new Promise((resolve, reject) => {
                resolve({
                    json: function () {
                    }
                })
            });
        }
    }
});

export default mockUserService;