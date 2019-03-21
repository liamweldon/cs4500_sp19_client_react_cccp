import React from "react";
import ServiceAnswerService from "../services/ServiceAnswerService";
import ServiceQuestionService from "../services/ServiceQuestionService";
import { Link } from "react-router-dom";
import "./ServiceQuestions.scss";
import "./table.scss";

class ServiceAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.saService = ServiceAnswerService.getInstance();
    this.sqService = ServiceQuestionService.getInstance();
    this.state = {
      questions: [],
      newAnswer: "",
      selectedQuestion: ""
    };
  }
  componentDidMount() {
    this.getServiceQuestions();
  }

  handleQuestionSelector = evt => {
    this.setState({ selectedQuestion: evt.target.value });
  };

  handleAnswerInput = evt => {
    this.setState({ newAnswer: evt.target.value });
  };

  getServiceQuestions() {
    this.sqService.findAllServiceQuestions().then(questions => {
      if (questions.length) {
        this.setState({
          questions: questions,
          selectedQuestion: questions[0].id
        });
      }
    });
  }

  addAnswer = () => {
    const { selectedQuestion, newAnswer } = this.state;
    this.saService
      .addServiceAnswer(selectedQuestion, { answer: newAnswer })
      .then(res => {
        this.getServiceQuestions();
        this.setState({ newAnswer: "" });
      });
  };

  deleteAnswer = (questionId, aId) => {
    this.saService
      .deleteServiceAnswer(questionId, aId)
      .then(res => this.getServiceQuestions());
  };

  render() {
    const { questions, selectedQuestion, newAnswer } = this.state;

    return (
      <div>
        <h3>Service Answers</h3>
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
                  {questions.map(question => (
                    <option value={question.id} key={question.id}>
                      {question.title}
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
            {questions.map(question => {
              return question.answers.map(answer => (
                <tr key={answer.id}>
                  <td>{answer.question}</td>
                  <td>
                    <Link to={`/admin/service-answers/${answer.id}`}>
                      {answer.choiceAnswer}
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.deleteAnswer(question.id, answer.id);
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

export default ServiceAnswers;
