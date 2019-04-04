import React from 'react';
import renderer from 'react-test-renderer';
import faqsJson from '../mockData/faq.mock.json';
import {StaticRouter} from 'react-router';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FAQAnswersContainer from "../../components/faq_answers/FAQAnswersContainer";
import FAQAnswers from "../../components/faq_answers/FAQAnswers";

Enzyme.configure({adapter: new Adapter()});

test('FAAs Summary Snapshots', () => {
    const component = renderer.create(
        <StaticRouter location="/admin/faas" context={{}}>
            <FAQAnswers faqs={faqsJson} editing={{}} newAnswer="" selectedQuestion="" eventHandlers={{}} />
        </StaticRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('FAAs summary DOM', () => {
    let wrapper = mount(
        <StaticRouter location="/admin/faqs" context={{}}>
            <FAQAnswersContainer />
        </StaticRouter>
    );

    let faasComponent = wrapper.find(FAQAnswersContainer);

    faasComponent.getFAQs = jest.fn().mockReturnValue(faqsJson);
    wrapper.update();
    faasComponent.setState({faqs: faqsJson, selectedQuestion: faqsJson[0].id});

    // there should be a row in the table for each FAQ
    expect(wrapper.find('.faq-row.existing').length).toEqual(0);
    expect(
        wrapper
            .find('.faq-row.existing')
            .at(0)
            .find('input').length
    ).toEqual(0);
});
