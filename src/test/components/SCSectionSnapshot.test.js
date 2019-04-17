import React from "react";
import TestRenderer from "react-test-renderer";

import ServiceCategorySection from "../../components/ServiceNavigator/ServiceCategorySection";
import ServiceCategoryService from "../../services/ServiceCategoryService";
import mockService from "../services/mocks/MockServiceCategoryService";
import serviceCategories from '../mockData/service-categories.mock.json'

const serviceCategoryService = ServiceCategoryService.getInstance();
beforeEach(() => {
  global.fetch = mockService(serviceCategories);
});

// Provide a new service to insert
const test_new_service = {
  id: 555,
  serviceName: "Car Wash",
  serviceDescription: "Clean your car!"
};


// Snapshot testing code
test("Rerender works properly", () => {
  // Create snapshot of initial services
  return serviceCategoryService
    .findServiceCategoryById(123)
    .then(category => {
      let component = TestRenderer.create(
        <ServiceCategorySection serviceCategory={category} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      // Add a new service to the category's service list, and re-render. Since there's 
      // No real interactivity changing the dom in this component, this is the only
      // real way to test rendering changes.
      category.services.push(test_new_service);

      component = TestRenderer.create(
            <ServiceCategorySection serviceCategory={category} />);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
    .catch(function(error) {});
});