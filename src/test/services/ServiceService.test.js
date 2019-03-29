import services from "../mockData/services.mock.json";
import ServiceService from "../../services/ServiceService";
import mockService from "./mocks/MockServiceService";

const test_new_service = {
  id: 555,
  serviceName: "Car Wash",
  serviceDescription: "Clean your car!",
  providers: [],
  serviceCategories: [],
  serviceQuestions: []
};

const test_update_service = {
  id: 678,
  serviceName: "Test3 Updated",
  serviceDescription: "Test3 Updated!",
  providers: [],
  serviceCategories: [],
  serviceQuestions: []
};

// Service mocking code
const serviceService = ServiceService.getInstance();

// Mock the service here
beforeAll(() => {
  global.fetch = mockService(services);
});

test("Test that finding a specific service works properly", () => {
  return serviceService.findServiceById(456).then(service => {
    expect(service).toBeDefined();

    expect(service.id).toBe(456);
    expect(service.serviceName).toBe("Test1");
    expect(service.serviceDescription).toBe("Test1!");
  });
});

// Test service mocking code behaves properly
test("Test that finding all services works properly", () => {
  return serviceService.findAllServices().then(services => {
    expect(services).toBeDefined();
    expect(services.length).toBe(3);
    expect(services[0].id).toBe(123);
    expect(services[1].id).toBe(234);
    expect(services[2].id).toBe(321);
  });
});

test("Test that creation works properly", () => {
  return serviceService.createService(test_new_service).then(service => {
    expect(service).toBeDefined();
    expect(service.id).toBe(555);

    expect(services).toBeDefined();
    expect(services).toHaveLength(4);
    expect(services[0].id).toBe(123);
    expect(services[1].id).toBe(234);
    expect(services[2].id).toBe(321);
    expect(services[3].id).toBe(555);
  });
});

test("Test that finding a specific service works properly", () => {
  return serviceService.updateService(test_update_service).then(service => {
    expect(service).toBeDefined();

    expect(service.id).toBe(678);
    expect(service.serviceName).toBe("Test3 Updated");
    expect(service.serviceDescription).toBe("Test3 Updated!");
  });
});

test("Test that delete works properly", () => {
  return serviceService.deleteService(123).then(response => {
    expect(services).toBeDefined();
    expect(services).toHaveLength(3);
    expect(services[0].id).toBe(234);
    expect(services[1].id).toBe(321);
    expect(services[2].id).toBe(555);
  });
});
