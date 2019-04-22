import React from "react";
import TestRenderer from "react-test-renderer";

import SelectedServices from "../../components/BusinessServiceScreen/SelectedServices";
import ServiceService from "../../services/ServiceService";

import services from "../mockData/services.mock.json";
import mockServiceService from "../services/mocks/MockServiceService";

const serviceService = ServiceService.getInstance();
beforeEach(() => {
  global.fetch = mockServiceService(services);
});

let newServices = services.slice(0, 1); 
let clickedService = undefined;

// Mock out selecting a service
const clickService = () => {
	clickedService =  newServices.pop()
}

test("Test clicking a service renders properly", () => {

  return serviceService
    .findAllServices()
    .then(services => {
      let component = TestRenderer.create(
        <SelectedServices selectedServices={newServices} clickedSelectedService={clickedService}
         />
      );
      let tree = component.toJSON();
      let testInstance = component.root;
      expect(tree).toMatchSnapshot();

      let rows = testInstance.findAllByProps({
            className: "list-group-item"
      });
      expect(rows.length).toBe(1);

      clickService();

      // Simulate clicking a service, removing it from the selected list.
      component = TestRenderer.create(
        <SelectedServices selectedServices={newServices} clickedSelectedServices={clickedService} />
      );
      tree = component.toJSON();
      testInstance = component.root;
      expect(tree).toMatchSnapshot();

      rows = testInstance.findAllByProps({
            className: "list-group-item"
      });
      expect(rows.length).toBe(0);
	});
})