import React from 'react';
import Provider from '../../components/Provider/Provider';
import ProviderContainer from '../../containers/ProviderContainer';
import renderer from 'react-test-renderer';
import faasJson from '../mockData/faa.mock.json';
import providerJson from '../mockData/provider.mock.json';
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

test('Provider Summary Snapshots', () => {
  const component = renderer.create(
    <StaticRouter location="/provider" context={{}}>
      <Provider faas={faasJson} provider={providerJson} />
    </StaticRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Provider summary DOM', () => {
  let wrapper = mount(
    <StaticRouter location="/provider" context={{}}>
      <ProviderContainer />
    </StaticRouter>
  );

  let providerComponent = wrapper.find(ProviderContainer);

  providerComponent.getProvider = jest.fn().mockReturnValue(providerJson);
  providerComponent.getFAAs = jest.fn().mockReturnValue(faasJson);
  wrapper.update();
  providerComponent.setState({faas: faasJson});
  providerComponent.setState({provider: providerJson});

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
