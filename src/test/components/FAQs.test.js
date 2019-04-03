import React from 'react';
import FAQs from '../../components/FAQs';
import FAQsContainer from '../../containers/FAQsContainer';
import renderer from 'react-test-renderer';
import faqsJson from '../mockData/faq.mock.json';
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('FAQs Summary Snapshots', () => {
  const component = renderer.create(
    <StaticRouter location="/admin/faqs" context={{}}>
      <FAQs faqs={faqsJson} editing={{}} newQuestion={{title: '', question: ''}} eventHandlers={{}} />
    </StaticRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('FAQs summary DOM', () => {
  let wrapper = mount(
    <StaticRouter location="/admin/faqs" context={{}}>
      <FAQsContainer />
    </StaticRouter>
  );

  let faqsComponent = wrapper.find(FAQsContainer);

  faqsComponent.getFAQs = jest.fn().mockReturnValue(faqsJson);
  wrapper.update();
  faqsComponent.setState({faqs: faqsJson});

  const firstFaqEditBtn = wrapper.find('.fa-pen-square').at(0);
  // there should be a row in the table for each FAQ
  expect(wrapper.find('.faq-row.existing').length).toEqual(faqsJson.length);
  expect(
    wrapper
      .find('.faq-row.existing')
      .at(0)
      .find('input').length
  ).toEqual(0);

  // click the pen icon to trigger edit mode for the first faq
  firstFaqEditBtn.props().onClick();
  wrapper.update();

  expect(
    wrapper
      .find('.faq-row.existing')
      .at(0)
      .find('input').length
  ).toEqual(2);
});
