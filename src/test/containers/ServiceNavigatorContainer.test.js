import React from 'react'
import TestRenderer from "react-test-renderer";

import ServiceNavigatorContainer from '../../containers/ServiceNavigatorContainer'
import mockService from  '../services/mocks/MockServiceCategoryService'
import ServiceCategoryService from '../../services/ServiceCategoryService'
import serviceCategories from '../mockData/service-categories.mock.json'

// Service mocking code
const serviceCategoryService = ServiceCategoryService.getInstance();

// Mock the service here
beforeAll(() => {
  global.fetch = mockService(serviceCategories);
});

test('ServiceNavigatorContainer renders correctly', () => {
    const testRenderer = TestRenderer.create(
        <ServiceNavigatorContainer
            serviceCategoryService={serviceCategoryService}/>)
    let tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()

    const testInstance   = testRenderer.root
    let   searchProviderNames = testInstance.findAllByProps({className: 'form-control'})

    searchProviderNames[0].props.onChange({target: {value: 'J123'}})
    tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
})
