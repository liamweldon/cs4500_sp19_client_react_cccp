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
        const serviceId = url.substring(idIndex, url.length - 1);
        return new Promise((resolve, reject) => {
          resolve({
            json: function() {
              return s.find(e => e.id == serviceId);
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
    } 
    else if (config.method === "post") {
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
      }
      else if (config.method === "put") {
        if (
          url.indexOf(`${API_ROOT}/api/services/`) !== -1 &&
          url.length > `${API_ROOT}/api/services/`.length
        ) {
          const idIndex = url.indexOf("/api/services/") + 14;
          const serviceId = url.substring(idIndex, url.length - 1);
          const old_service = s.find(e => e.id == serviceId);
          if (old_service !== undefined) {
            const updated_service = JSON.parse(config.body);
            console.log("before");
            console.log(s);
            console.log(s.indexOf(old_service));
            s.splice(s.indexOf(old_service), 1, updated_service);
            console.log("after");
            console.log(s);
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
        s.shift();
        return new Promise((resolve, reject) => {
          resolve({ json: function() {} });
        });
      }
    }
  });

export default mockServiceService;
