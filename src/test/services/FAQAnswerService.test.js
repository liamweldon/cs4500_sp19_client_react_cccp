import FAQAnswerService from '../../services/FAQAnswerService';
import json from '../mockData/faa.mock.json';

let faaService = FAQAnswerService.getInstance();

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('/users/55/faas')) {
    return new Promise((resolve, reject) => {
      resolve({
        json: function() {
          return json;
        }
      });
    });
  }
});

test('findFAAsByUser', () => {
  return faaService.findFAAsByUser(55).then((faas) => {
    expect(faas).toBeDefined();
    expect(faas.length).toBe(2);
    expect(faas[0].question).toBe('Do you offer discounted services?');
    expect(faas[0].answer).toBe('No');
    expect(faas[1].question).toBe('How many employees does your company have?');
    expect(faas[1].answer).toBe('80');
  });
});
