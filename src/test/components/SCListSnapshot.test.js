import React from "react";
import TestRenderer from "react-test-renderer";

import ServiceCategoryList from "../../components/ServiceNavigator/ServiceCategoryList";
import ServiceCategoryService from "../../services/ServiceCategoryService";
import mockService from "../services/mocks/MockServiceCategoryService";
import serviceCategories from '../mockData/service-categories.mock.json'

const serviceCategoryService = ServiceCategoryService.getInstance();
beforeEach(() => {
  global.fetch = mockService(serviceCategories);
});

var test_new_category = {
	id: "999",
	serviceCategoryName: "New One",
	serviceProviders: [],
  questions: [],
  services: [] 
}

// Snapshot testing code
test("Rerender works properly", () => {
  // Create snapshot of initial services
  return serviceCategoryService
    .findAllServiceCategories()
    .then(categories => {
      let component = TestRenderer.create(
        <ServiceCategoryList categories={categories} />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      // Add a new service category to the list, and re-render. Since there's 
      // No real interactivity changing the dom in this component, this is the only
      // real way to test rendering changes.
      categories.push(test_new_category);

      component = TestRenderer.create(
            <ServiceCategoryList categories={categories} />);
      tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })
    .catch(function(error) {});
});