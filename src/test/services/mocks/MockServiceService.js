import { API_ROOT } from "../../../api-config";

const mockService = s =>
  jest.fn().mockImplementation((url, config) => {
    if (!config) {
      if (url.indexOf(`${API_ROOT}/api/services`) != -1) {
        return new Promise((resolve, reject) => {
          resolve({
            json: function() {
              return s;
            }
          });
        });
      }
    } else if (config.method === "post") {
      let service = JSON.parse(config.body);
      service.id = 555;
      s.push(service);
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return service;
          }
        });
      });
    } else if (config.method === "delete") {
      if (url.indexOf(`${API_ROOT}/api/services/123`) != -1) {
        delete s[0];
        return new Promise((resolve, reject) => {
          resolve({ json: function() {} });
        });
      }
    }
  });

export default mockService;
