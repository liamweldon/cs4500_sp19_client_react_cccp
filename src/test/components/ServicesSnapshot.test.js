import React from "react";
import TestRenderer from "react-test-renderer";

import Services from "../../components/Services";
import ServiceService from "../../services/ServiceService";

import services from "../mockData/services.mock.json";
import mockServiceService from "../services/mocks/MockServiceService";

const serviceService = ServiceService.getInstance();
beforeEach(() => {
  global.fetch = mockServiceService(services);
});

// Provide a new service to insert
const test_new_service = {
  id: 555,
  serviceName: "Car Wash",
  serviceDescription: "Clean your car!"
};

// Provide an initial service to populate the edit fields. Replicate the one in the container
// for consistency.
let mock_initial_service = {
  id: 0,
  serviceName: "Service Name",
  serviceDescription: "Description"
};

// Snapshot testing code
test("Creation renders properly in DOM", () => {
  // Create snapshot of initial services
  return serviceService
    .findAllServices()
    .then(services => {
      let component = TestRenderer.create(
        <Services services={services} service={mock_initial_service} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      // Create a new service via our mocked ServiceService. In the normal case,
      // the ServiceService would modify the database, and the ServiceContainer
      // would then update its state with the new data and re-call the Services
      // funcional component. Here, we simulate that process by updating our
      // mock data via the mock ServiceService and then recreating our
      // functional component with the modified mock data.
      serviceService
        .createService(test_new_service)
        .then(service => {
          component = TestRenderer.create(
            <Services services={services} service={mock_initial_service} />
          );
          let tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        })
        .catch(function(error) {});
    })
    .catch(function(error) {});
});
