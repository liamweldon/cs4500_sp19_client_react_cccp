import React from 'react';
import FAQs from '../../components/FAQs';
import renderer from 'react-test-renderer';
import faqsJson from '../mockData/faq.mock.json';
import {StaticRouter} from 'react-router';

test('FAQs summary', () => {
  const editMock = jest.fn();

  const component = renderer.create(
    <StaticRouter location="/admin/faqs" context={{}}>
      <FAQs
        faqs={faqsJson}
        editing={{}}
        newQuestion={{title: '', question: ''}}
        eventHandlers={{handleEditClick: editMock}}
      />
    </StaticRouter>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  const table = tree.children.find((element) => element.props['className'] === 'table faqs');
  const rows = table.children[0].children;
  const firstFaqRow = rows[2];
  const firstFaqCell = firstFaqRow.children[0].children;
  const firstFaqEditBtn = firstFaqRow.children[3].children[0];

  // there should be a row in the table for each FAQ, plus 1 for the header and 1 for the add new row
  expect(rows.length).toEqual(faqsJson.length + 2);

  // before we click the first data row, the Title column should be a link
  expect(editMock.mock.calls.length).toBe(0);
  expect(firstFaqCell[0].type).toEqual('a');

  // click the edit button and our edit handler should be called
  firstFaqEditBtn.props.onClick();
  expect(editMock.mock.calls.length).toBe(1);
});
