import React from 'react';
import { API_ROOT } from "../../../api-config";

const mockServiceQuestion = (s) => jest.fn().mockImplementation((url, config) => {
    if(!config) {
        if (url.indexOf(`${API_ROOT}/api/service-questions`) != -1) {
            return new Promise((resolve, reject) => {
                resolve({json: function() {
                    return s;
                }})
            });
        }
    } else if (config.method === 'post') {
        let serviceQuestion = JSON.parse(config.body);
        serviceQuestion.id = 555;
        s.push(serviceQuestion);
        return new Promise((resolve, reject) => {
            resolve({json: function() {
                return serviceQuestion;
            }})
        });
    }
    else if (url.indexOf(`${API_ROOT}/api/services-questions/${serviceQuestion.id}`) !== -1) {
        const old_question = s.find(e => e.id === serviceQuestion.id);
        if (old_question !== undefined) {
            const new_question = JSON.parse(JSON.stringify(old_question));
            s.splice(s.indexOf(old_question), 1, new_question);
            return new Promise((resolve, reject) => {
                resolve({
                    json: function() {
                        return new_question;
                    }
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                reject({
                    json: function() {
                        return undefined;
                    }
                });
            });
        }
    }


    else if (config.method === 'delete') {
        if (url.indexOf(`${API_ROOT}/api/service-questions/0`) != -1) {
            delete s[0];
            return new Promise((resolve, reject) => {
                resolve({json: function() {}})
            });
        }
    }
});

export default mockServiceQuestion;
