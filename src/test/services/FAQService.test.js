import FAQService from '../../services/FAQService';
import json from '../mockData/faq.mock.json';

let faqService = FAQService.getInstance();

global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes('/faqs')) {
    return new Promise((resolve, reject) => {
      resolve({
        json: function() {
          return json;
        }
      });
    });
  }
});

test('findAllFAQs', () => {
  return faqService.findAllFAQs().then((faqs) => {
    expect(faqs).toBeDefined();
    expect(faqs.length).toBe(3);
    expect(faqs[0].title).toBe('Background Check');
  });
});
