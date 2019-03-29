import { API_ROOT } from "../../../api-config";

const mockServiceService = s =>
  jest.fn().mockImplementation((url, config) => {
    if (!config) {
      // Find By Id
      if (
        url.indexOf(`${API_ROOT}/api/services/`) !== -1 &&
        url.length > `${API_ROOT}/api/services/`.length
      ) {
        const idIndex = url.indexOf("/api/services/") + 14;
        const serviceId = url.substring(idIndex);
        return new Promise((resolve, reject) => {
          resolve({
            json: function() {
              return s.find(e => e.id === serviceId);
            }
          });
        });
      }

      // Find All
      if (url.indexOf(`${API_ROOT}/api/services`) !== -1) {
        return new Promise((resolve, reject) => {
          resolve({
            json: function() {
              return s;
            }
          });
        });
      }
    } else if (config.method === "post") {
      const service = JSON.parse(config.body);
      // Create
      if (url.indexOf(`${API_ROOT}/api/services/`) !== -1) {
        const service = JSON.parse(config.body);
        service.id = 555;
        s.push(service);
        return new Promise((resolve, reject) => {
          resolve({
            json: function() {
              return service;
            }
          });
        });
      }
      // Update
      else if (url.indexOf(`${API_ROOT}/api/services/${service.id}`) !== -1) {
        const old_service = s.find(e => e.id === service.id);
        if (old_service !== undefined) {
          const updated_service = JSON.parse(JSON.stringify(old_service));
          s.splice(s.indexOf(old_service), 1, updated_service);
          return new Promise((resolve, reject) => {
            resolve({
              json: function() {
                return updated_service;
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
    }
    // Delete
    else if (config.method === "delete") {
      if (url.indexOf(`${API_ROOT}/api/services/123`) !== -1) {
        delete s[0];
        return new Promise((resolve, reject) => {
          resolve({ json: function() {} });
        });
      }
    }
  });

export default mockServiceService;
