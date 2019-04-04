import serviceCategories from "../mockData/service-categories.mock.json";
import ServiceCategoryService from "../../services/ServiceCategoryService";
import mockService from "./mocks/MockServiceCategoryService";

// Service mocking code
const serviceCategoryService = ServiceCategoryService.getInstance();

// Mock the service here
beforeAll(() => {
  global.fetch = mockService(serviceCategories);
});

test("Test that finding a specific service ategory works properly", () => {
  return serviceCategoryService.findServiceCategoryById(123).then(category => {
    expect(category).toBeDefined();

    expect(category.id).toBe("123");
    expect(category.serviceCategoryName).toBe("Home Improvements");
  });
});

test("Test that finding all service categories works properly", () => {
  return serviceCategoryService.findAllServiceCategories().then(categories => {
    expect(categories).toBeDefined();
    expect(categories.length).toBe(10);
    expect(categories[0].id).toBe("123");
    expect(categories[1].id).toBe("345");
    expect(categories[2].id).toBe("234");
    expect(categories[3].id).toBe("456");
    expect(categories[4].id).toBe("567");
    expect(categories[5].id).toBe("678");
    expect(categories[6].id).toBe("789");
    expect(categories[7].id).toBe("890");
    expect(categories[8].id).toBe("987");
    expect(categories[9].id).toBe("876");
  });
});