import ServiceAnswerService from '../../services/ServiceAnswerService';
import mockServiceAnswer from '../services/mocks/MockServiceAnswerService'
import serviceAnswers from '../mockData/serviceanswer.mock.json'
import json from '../mockData/serviceanswer.mock.json';

const serviceAnswerService = ServiceAnswerService.getInstance();

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('/service-answers')) {
    return new Promise((resolve, reject) => {
      resolve({
        json: function() {
          return json;
        }
      });
    });
  }
});

test('findAllServiceAnswers', () => {
  return serviceAnswerService.findAllServiceAnswers().then((serviceAnswers) => {
    expect(serviceAnswers).toBeDefined();
    expect(serviceAnswers.length).toBe(2);
    expect(serviceAnswers[0].id).toBe(1);
    expect(serviceAnswers[1].type).toBe('Choice');
  });
});