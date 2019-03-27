import React from 'react';
import { API_ROOT } from "../../../api-config";

const mockFAQ = (s) => jest.fn().mockImplementation((url, config) => {
    if(!config) {
      if (url.indexOf(`${API_ROOT}/api/faqs`) != -1) {
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return s;
        }})
      });
      }
    } else if (config.method === 'post') {
      let faq = JSON.parse(config.body);
      faq.id = 555;
      s.push(faq);
      return new Promise((resolve, reject) => {
        resolve({json: function() {
          return faq;
        }})
      });
    } else if (config.method === 'delete') {
      if (url.indexOf(`${API_ROOT}/api/faqs/0`) != -1) {
        delete s[0];
        return new Promise((resolve, reject) => {
        resolve({json: function() {}})
      });
      }
    }
  });

export default mockFAQ;