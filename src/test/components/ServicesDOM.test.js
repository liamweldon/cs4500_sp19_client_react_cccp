import React from 'react'
import TestRenderer from 'react-test-renderer'
import Services from '../../components/Services'
import ServiceService from '../../services/ServiceService'
import services from '../mockData/services.mock.json'
import mockService from '../services/mocks/MockServiceService'

// Provide an initial service to populate the edit fields. Replicate the one in the container
// for consistency.
let mock_initial_service = {id: 0, serviceName: "Service Name", serviceDescription: "Description"}

// Mock the service here
const serviceService = ServiceService.getInstance();
beforeEach(() => {
	global.fetch = mockService(services);
})

// DOM testing code
test('Deletion renders correctly in DOM', () => {

  // Create snapshot of initial services
  return serviceService.findAllServices().then(services => {
    let component = TestRenderer
      .create(<Services services={services}
                       service={mock_initial_service}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    let testInstance = component.root;
    let rows = testInstance.findAllByProps({className : "serviceRow"});
    expect(rows.length).toBe(3);

    // Delete a service via our mocked ServiceService. In the normal case,
    // the ServiceService would modify the database, and the ServiceContainer 
    // would then update its state with the new data and re-call the Services 
    // funcional component. Here, we simulate that process by updating our 
    // mock data via the mock ServiceService and then recreating our 
    // functional component with the modified mock data.
    serviceService.deleteService(123).then(() => {
      component = TestRenderer
        .create(<Services services={services}
                        service={mock_initial_service} />);
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      let newTestInstance = component.root;
      let newRows = testInstance.findAllByProps({className : "serviceRow"});
      expect(newRows.length).toBe(2);
    }).catch(function(error) {});
  }).catch(function(error) {});
});
