import React from "react";
import FAQAnswerService from "../services/FAQAnswerService";
import FAQService from "../services/FAQService";
import { Link } from "react-router-dom";
import "./FAQDetails.scss";

class FAQAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.faqAnswerService = FAQAnswerService.getInstance();
    this.faqService = FAQService.getInstance();
    this.state = {
      faqAnswers: [],
      faqs: []
    };
  }
  componentDidMount() {
    this.getFAAs();
    this.getFAQs();
  }

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

  deleteAnswer = (id) => {
    this.faqAnswerService.deleteFAA(id).then((res) => this.getFAAs());
  };

  render() {
    return (
      <div>
        <h3>Frequently Asked Questions Answers</h3>
        <table className="table">
          <tbody>
            <tr className="header-row">
              <td>Question</td>
              <td>Answer</td>
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
