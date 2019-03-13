import React from 'react';
import FAQAnswerService from '../services/FAQAnswerService';

class FAQAnswerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.faqAnswerService = FAQAnswerService.getInstance();
    this.state = {
      faqAnswers: [],
      faqAnswer: {
        choiceAnswer: '',
        id: 1
      }
    };
  }
  componentDidMount() {
    this.faqAnswerService.findAllFAAs().then((faqAnswers) => {
      this.props.history.push('/admin/faas/' + faqAnswers[0].id);
      this.setState({
        faqAnswers: faqAnswers,
        faqAnswer: faqAnswers[0]
      });
    });
  }
  selectFAQAnswer = (id) =>
    this.faqAnswerService.findFAAById(id).then((faqAnswer) => {
      this.props.history.push('/admin/faas/' + id);
      this.setState({
        faqAnswer: faqAnswer
      });
    });
  render() {
    return (
      <div>
        <h3>FAQ Answer Details</h3>
        <select
          value={this.state.faqAnswer.id}
          onChange={(e) => this.selectFAQAnswer(e.target.value)}
          className="form-control"
        >
          {this.state.faqAnswers.map((faqAnswer) => (
            <option value={faqAnswer.id} key={faqAnswer.id}>
              {faqAnswer.id}
            </option>
          ))}
        </select>
        <label>FAQ Answer Question</label>
        <br />
        <input onChange={() => {}} className="form-control" value={this.state.faqAnswer.question} />
        <label>FAQ Answer Answer</label>
        <br />
        <input onChange={() => {}} className="form-control" value={this.state.faqAnswer.answer} />
      </div>
    );
  }
}

export default FAQAnswerDetails;
