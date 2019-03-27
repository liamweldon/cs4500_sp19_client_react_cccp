import React from 'react';
import { API_ROOT } from "../../../api-config";

const mockServiceAnswer = (s) => jest.fn().mockImplementation((url, config) => {
    if(!config) {
      if (url.indexOf(`${API_ROOT}/api/service-answer`) != -1) {
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return s;
        }})
      });
      }
    } else if (config.method === 'post') {
      let serviceAnswer = JSON.parse(config.body);
      serviceAnswer.id = 4;
      s.push(serviceAnswer);
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return serviceAnswer;
        }})
      });
    } else if (config.method === 'delete') {
      if (url.indexOf(`${API_ROOT}/api/service-answers/1`) != -1) {
        delete s[0];
        return new Promise((resolve, reject) => {
        resolve({json: function() {}})
      });
      }
    }
  });

export default mockServiceAnswer;