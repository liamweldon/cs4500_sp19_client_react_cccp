import React from "react";
import FAQAnswerService from "../services/FAQAnswerService";
import { Link } from "react-router-dom";

class FAQAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.faqAnswerService = FAQAnswerService.getInstance();
    this.state = {
      faqAnswers: []
    };
  }
  componentDidMount() {
    this.faqAnswerService.findAllFAAs().then(faqAnswers =>
      this.setState({
        faqAnswers: faqAnswers || []
      })
    );
  }
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
