import React from "react";
import FAQAnswerService from "../services/FAQAnswerService";
import FAQService from "../services/FAQService";
import { Link } from "react-router-dom";
import "./FAQs.scss";
import "./table.scss";

class FAQAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.faqAnswerService = FAQAnswerService.getInstance();
    this.faqService = FAQService.getInstance();
    this.state = {
      faqs: [],
      newAnswer: "",
      selectedQuestion: ""
    };
  }
  componentDidMount() {
    this.getFAQs();
  }

  handleQuestionSelector = evt => {
    this.setState({ selectedQuestion: evt.target.value });
  };

  handleAnswerInput = evt => {
    this.setState({ newAnswer: evt.target.value });
  };

  getFAQs() {
    this.faqService.findAllFAQs().then(faqs => {
      if (faqs.length) {
        this.setState({
          faqs: faqs,
          selectedQuestion: faqs[0].id
        });
      }
    });
  }

  addAnswer = () => {
    const { selectedQuestion, newAnswer } = this.state;
    this.faqAnswerService
      .addFAA(selectedQuestion, { answer: newAnswer })
      .then(res => {
        this.getFAQs();
        this.setState({ newAnswer: "" });
      });
  };

  deleteAnswer = (questionId, faaId) => {
    this.faqAnswerService
      .deleteFAA(questionId, faaId)
      .then(res => this.getFAQs());
  };

  render() {
    const { faqs, selectedQuestion, newAnswer } = this.state;

    return (
      <div>
        <h3>Frequently Asked Questions Answers</h3>
        <table className="table">
          <tbody>
            <tr className="header-row">
              <td>Question</td>
              <td>Answer</td>
              <td />
            </tr>
            <tr key={-1}>
              <td>
                <select
                  value={selectedQuestion}
                  className="form-control"
                  onChange={this.handleQuestionSelector}
                >
                  {faqs.map(faq => (
                    <option value={faq.id} key={faq.id}>
                      {faq.title}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input value={newAnswer} onChange={this.handleAnswerInput} />
              </td>
              <td>
                <button onClick={this.addAnswer}>
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
                        this.deleteAnswer(faq.id, faqAnswer.id);
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
  }
}

export default FAQAnswers;
