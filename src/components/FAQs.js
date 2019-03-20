import React from 'react';
import './table.scss';
import {Link} from 'react-router-dom';
import './FAQs.scss';

const FAQs = ({faqs, editing, newQuestion, eventHandlers}) => (
  <div>
    <h3>Frequently Asked Questions</h3>
    <table className="table faqs">
      <tbody>
        <tr className="header-row">
          <td>Title</td>
          <td>Question</td>
          <td />
          <td />
        </tr>
        <tr key={-1}>
          <td>
            <input value={newQuestion.title} name="title" onChange={eventHandlers.handleNewQuestionInputChange} />
          </td>
          <td>
            <input value={newQuestion.question} name="question" onChange={eventHandlers.handleNewQuestionInputChange} />
          </td>
          <td>
            <button onClick={eventHandlers.handleAddClick}>
              <i className="fas fa-plus-square" />
            </button>
          </td>
          <td />
        </tr>
        {faqs.map((faq) => (
          <tr key={faq.id}>
            <td>
              {faq.id in editing ? (
                <input
                  value={editing[faq.id].title}
                  name="title"
                  onChange={(e) => {
                    eventHandlers.handleInputChange(e, faq.id);
                  }}
                />
              ) : (
                <Link to={`/admin/faqs/${faq.id}`}>{faq.title}</Link>
              )}
            </td>
            <td>
              {faq.id in editing ? (
                <input
                  defaultValue={editing[faq.id].question}
                  name="question"
                  onChange={(e) => {
                    eventHandlers.handleInputChange(e, faq.id);
                  }}
                />
              ) : (
                faq.question
              )}
            </td>
            <td>
              <button
                onClick={() => {
                  eventHandlers.handleDeleteClick(faq.id);
                }}
              >
                <i className="fas fa-trash-alt" />
              </button>
            </td>
            <td>
              {faq.id in editing ? (
                <i
                  className="fas fa-check-square"
                  onClick={() => {
                    eventHandlers.handleSaveClick(faq.id);
                  }}
                />
              ) : (
                <i className="fas fa-pen-square" onClick={() => eventHandlers.handleEditClick(faq)} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
export default FAQs;
