import React from 'react'
import renderer from 'react-test-renderer';
import ServiceQuestions from '../../components/ServiceQuestions'
import ServiceQuestionsContainer from '../../components/ServiceQuestionsContainer'
import ServiceQuestionService from '../../services/ServiceQuestionService'
import Services from '../../components/Services'
import ServiceService from '../../services/ServiceService'
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import serviceQuestions from '../mockData/service-questions.mock.json'
import mockServiceQuestion from '../services/mocks/MockServiceQuestionService'
import services from '../mockData/services.mock.json'
import mockService from '../services/mocks/MockServiceService'

Enzyme.configure({adapter: new Adapter()});

// Baseline initial service question
let mock_initial_service_question = {id: 0, serviceName: "Service Name", type: "Type", question: "Question"}

// Mock both service and service question services
const serviceQuestionService = ServiceQuestionService.getInstance();
const serviceService = ServiceService.getInstance();
beforeEach(() => {
	global.fetch = mockServiceQuestion(serviceQuestions);
})

test('Service Question Summary Snapshot and DOM', () => {
  const component = renderer.create(
    <StaticRouter location="/admin/service-questions" context={{}}>
			<ServiceQuestions serviceQuestions={serviceQuestions} services={services}
				editing={{}} eventHandlers={{}} newServiceQuestion={mock_initial_service_question}/>
    </StaticRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

	let testInstance = component.root;
	let rows = testInstance.findAllByProps({className : "serviceQuestionRow"});
	expect(rows.length).toBe(4);
});
