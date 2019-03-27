import React from 'react';
import { API_ROOT } from "../../../api-config";
import serviceAnswers from "../../mockData/serviceanswer.mock.json"


const mockSAService = (s) => jest.fn().mockImplementation((url, config) => {
    if(!config) {
      if (url.indexOf('${API_ROOT}/api/service-answers') != -1) {
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return s;
        }})
      });
      }
    } else if (config.method === 'post') {
      let answer = JSON.parse(config.body);
      answer.id = 1;
      s.push(answer);
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return service-answer;
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

export default mockSAService;