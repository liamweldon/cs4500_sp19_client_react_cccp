import React from "react";
import TestRenderer from "react-test-renderer";

import ServiceCategories from "../../components/Services";
import ServiceCategoryService from "../../services/ServiceCategoryService";
import ServiceCategoryPills from "../../components/ServiceCategoryPills";
import mockServiceCategoryService from "../services/mocks/MockServiceCategoryService";
import serviceCategories from "../mockData/service-categories.mock.json";

const serviceCategoryService = ServiceCategoryService.getInstance();
beforeEach(() => {
    global.fetch = mockServiceCategoryService(serviceCategories);
});

test("Search renders correctly in DOM", () => {
    // Create snapshot of initial services
    return serviceCategoryService
        .findAllServiceCategories()
        .then(serviceCategories => {
        let component = TestRenderer.create(
            <ServiceCategoryPills
        serviceCategories={}
/>
);
let tree = component.toJSON();
expect(tree).toMatchSnapshot();

let testInstance = component.root;
let rows = testInstance.findAllByProps({ className: "nav-item" });
expect(rows.length).toBe(0);
})
.catch(function(error) {});
});
