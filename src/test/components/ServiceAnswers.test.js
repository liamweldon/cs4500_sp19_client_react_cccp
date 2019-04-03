import React from 'react'
import renderer from 'react-test-renderer';
import ServiceAnswers from '../../components/ServiceAnswers'
import ServiceAnswersContainer from '../../containers/ServiceAnswersContainer'
import ServiceAnswerService from '../../services/ServiceAnswerService'
import ServiceQuestions from '../../components/ServiceQuestions'
import ServiceQuestionService from '../../services/ServiceQuestionService'
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import serviceAnswers from '../mockData/serviceanswer.mock.json'
import mockServiceAnswer from '../services/mocks/MockServiceAnswerService'
import serviceQuestions from '../mockData/servicequestion.mock.json'

Enzyme.configure({adapter: new Adapter()});

// Baseline initial service answer
let mock_initial_service_answer = {id: 0, type: "Type", question: "Question", answer: "Answer"}

// Mock service answer services
const serviceAnswerService = ServiceAnswerService.getInstance();
const serviceQuestionService = ServiceQuestionService.getInstance();
beforeEach(() => {
	global.fetch = mockServiceAnswer(serviceAnswers);
})

test('Service Answer Summary Snapshot and DOM', () => {
  const component = renderer.create(
    <StaticRouter location="/admin/service-answers" context={{}}>
			<ServiceAnswers serviceAnswers={serviceAnswers} serviceQuestions={serviceQuestions}
				editing={{}} eventHandlers={{}} newAnswer={mock_initial_service_answer}/>
    </StaticRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

	let testInstance = component.root;
	let rows = testInstance.findAllByProps({className : "answer-row"});
	expect(rows.length).toBe(2);
});
