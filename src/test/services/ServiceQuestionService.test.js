import ServiceQuestionService from '../../services/ServiceQuestionService';
import mockServiceQuestion from '../services/mocks/MockServiceQuestionService'
import serviceQuestions from '../mockData/service-questions.mock.json'
import json from '../mockData/service-questions.mock.json';

const serviceQuestionService = ServiceQuestionService.getInstance();

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('/service-questions')) {
    return new Promise((resolve, reject) => {
      resolve({
        json: function() {
          return json;
        }
      });
    });
  }
});

test('findAllServiceQuestions', () => {
  return serviceQuestionService.findAllServiceQuestions().then((serviceQuestions) => {
    expect(serviceQuestions).toBeDefined();
    expect(serviceQuestions.length).toBe(4);
    expect(serviceQuestions[0].serviceName).toBe('Pet Sitting');
    expect(serviceQuestions[1].type).toBe('Choice');
  });
});
