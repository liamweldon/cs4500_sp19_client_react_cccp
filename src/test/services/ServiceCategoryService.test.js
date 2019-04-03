import ServiceCategoryService from '../../services/ServiceCategoryService';
import serviceCategories from '../mockData/service-categories.mock.json'
import json from '../mockData/service-categories.mock.json';

const serviceCategoryService = ServiceCategoryService.getInstance();

global.fetch = jest.fn().mockImplementation((url) => {
    if (url.includes('/categories')) {
    return new Promise((resolve, reject) => {
        resolve({
                    json: function() {
        return json;
    }
});
});
}
});

test('findAllServiceCategories', () => {
    return serviceCategoryService.findAllServiceCategories().then((serviceCategories) => {
        expect(serviceCategories).toBeDefined();
expect(serviceCategories.length).toBe(5);
expect(serviceCategories[0].title).toBe("Home Improvements");
});
});