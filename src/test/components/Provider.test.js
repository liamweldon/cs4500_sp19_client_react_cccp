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

  expect(wrapper.find('.provider .faq').length).toEqual(faasJson.length);
  expect(wrapper.find('.provider .description').text()).toEqual(providerJson.description);
  expect(wrapper.find('.provider .name').text()).toEqual(providerJson.firstName);
});
