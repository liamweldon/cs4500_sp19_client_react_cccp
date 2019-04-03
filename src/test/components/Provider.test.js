import React from 'react';
import Provider from '../../components/Provider';
import ProviderContainer from '../../containers/ProviderContainer';
import renderer from 'react-test-renderer';
import faasJson from '../mockData/faa.mock.json';
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

/*test('Provider Summary Snapshots', () => {
  const component = renderer.create(
    <StaticRouter location="/admin/faqs" context={{}}>
      <Provider faqs={faasJson} editing={{}} newQuestion={{title: '', question: ''}} eventHandlers={{}} />
    </StaticRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Provider summary DOM', () => {
  let wrapper = mount(
    <StaticRouter location="/admin/faqs" context={{}}>
      <ProviderContainer />
    </StaticRouter>
  );

  let faqsComponent = wrapper.find(ProviderContainer);

  faqsComponent.getProvider = jest.fn().mockReturnValue(faasJson);
  wrapper.update();
  faqsComponent.setState({faqs: faasJson});

  const firstFaqEditBtn = wrapper.find('.fa-pen-square').at(0);
  // there should be a row in the table for each FAQ
  expect(wrapper.find('.faq-row.existing').length).toEqual(faasJson.length);
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
*/
