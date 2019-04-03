import React from 'react';
import { API_ROOT } from "../../../api-config";

const mockService = (s) => jest.fn().mockImplementation((url, config) => {
  if (!config) {
    // Find By Id
    if (
      url.indexOf(`${API_ROOT}/api/categories/`) !== -1 &&
      url.length > `${API_ROOT}/api/categories/`.length
    ) {
      const idIndex = url.indexOf("/api/categories/") + 16;
      const categoryId = url.substring(idIndex);
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return s.find(e => e.id === categoryId);
          }
        });
      });
    }

    // Find All
    if (url.indexOf(`${API_ROOT}/api/categories`) !== -1) {
      return new Promise((resolve, reject) => {
        resolve({
          json: function() {
            return s;
          }
        });
      });
    }
  }
});

export default mockService; 