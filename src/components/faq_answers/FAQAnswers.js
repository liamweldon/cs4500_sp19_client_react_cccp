import React from "react";
import { Link } from "react-router-dom";
import "../FAQs.scss";
import "../table.scss";

const FAQAnswers = ({ faqs, selectedQuestion, newAnswer, eventHandlers }) => {
  return (
    <div>
      <h3>Frequently Asked Questions Answers</h3>
      <table className="table">
        <tbody>
          <tr className="header-row">
            <td>Question</td>
            <td>Answer</td  >
            <td />
          </tr>
          <tr className="faa-row" key={-1}>
            <td>
              <select
                value={selectedQuestion}
                className="form-control"
                onChange={eventHandlers.handleQuestionSelector}
              >
                {faqs.map(faq => (
                  <option value={faq.id} key={faq.id}>
                    {faq.title}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                value={newAnswer}
                onChange={eventHandlers.handleAnswerInput}
              />
            </td>
            <td>
              <button onClick={eventHandlers.addAnswer}>
                <i className="fas fa-plus-square" />
              </button>
            </td>
            <td />
          </tr>
          {faqs.map(faq => {
            return faq.answers.map(faqAnswer => (
              <tr key={faqAnswer.id}>
                <td>{faqAnswer.question}</td>
                <td>
                  <Link to={`/admin/faas/${faqAnswer.id}`}>
                    {faqAnswer.answer}
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => {
                      eventHandlers.deleteAnswer(faq.id, faqAnswer.id);
                    }}
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FAQAnswers;
