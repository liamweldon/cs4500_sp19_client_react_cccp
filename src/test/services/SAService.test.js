import ServiceAnswerService from '../../services/ServiceAnswerService';
import json from '../mockData/serviceanswer.mock.json';

let saService = ServiceAnswerService.getInstance();

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
  return saService.findAllServiceAnswers().then((answers) => {
    expect(answers).toBeDefined();
    expect(answers.length).toBe(3);
    expect(answers[0].choiceAnswer).toBe(1);
  });
});
