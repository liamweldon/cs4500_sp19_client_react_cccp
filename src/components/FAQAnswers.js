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
      faqAnswers: [],
      faqs: [],
      newAnswer: "",
      selectedQuestion: ""
    };
  }
  componentDidMount() {
    this.getFAAs();
    this.getFAQs();
  }

  handleQuestionSelector = evt => {
    this.setState({ selectedQuestion: evt.target.value });
  };

  handleAnswerInput = evt => {
    this.setState({ newAnswer: evt.target.value });
  };

  getFAAs() {
    this.faqAnswerService.findAllFAAs().then(faqAnswers => {
      this.setState({
        faqAnswers: faqAnswers.length ? faqAnswers : []
      });
    });
  }

  getFAQs() {
    this.faqService.findAllFAQs().then(faqs => {
      if (faqs.length) {
        this.setState({
          faqs: faqs
        });
      }
    });
  }

  addAnswer = () => {
    const { selectedQuestion, newAnswer } = this.state;
    this.faqAnswerService.addFAA({answer: newAnswer}).then(res => {
      this.faqService.linkFAAtoFAQ(res.id, selectedQuestion).then(res => {
        this.getFAAs();
      })
    });
  };

  deleteAnswer = id => {
    this.faqAnswerService.deleteFAA(id).then(res => this.getFAAs());
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
            {this.state.faqAnswers.map(faqAnswer => (
              <tr key={faqAnswer.id}>
                <td>{faqAnswer.question}</td>
                <td>
                  <Link to={`/admin/faas/${faqAnswer.id}`}>
                    {faqAnswer.answer}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FAQAnswers;
