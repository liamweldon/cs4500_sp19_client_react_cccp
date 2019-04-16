import React from "react";
import TestRenderer from "react-test-renderer";

import Services from "../../components/Services";
import ServiceService from "../../services/ServiceService";
import SearchBar from "../../components/SearchBar";

import services from "../mockData/services.mock.json";
import mockServiceService from "../services/mocks/MockServiceService";

const serviceService = ServiceService.getInstance();
beforeEach(() => {
  global.fetch = mockServiceService(services);
});

test("Search renders correctly in DOM", () => {
  // Create snapshot of initial services
  return serviceService
    .findAllServices()
    .then(services => {
      let component = TestRenderer.create(
        <Search
          nameQuery={'House'}
          zipQuery={''}
          search={SearchBar.onSearch}
          eventHandlers={{}}
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      let testInstance = component.root;
      let rows = testInstance.findAllByProps({ className: "resultRow" });
      expect(rows.length).toBe(0);
    })
    .catch(function(error) {});
});
