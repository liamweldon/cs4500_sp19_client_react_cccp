import React from 'react';
import {API_ROOT} from "../../../api-config";

const mockServiceCategoryService = (s) => jest.fn().mockImplementation((url, config) => {
    if(!config){
        if (url.indexOf(`${API_ROOT}/api/categories`) != -1) {
        return new Promise((resolve, reject) = > {
            resolve({
                        json: function()
        {
            return s;
        }
    })
    })
        ;
    }
}
}