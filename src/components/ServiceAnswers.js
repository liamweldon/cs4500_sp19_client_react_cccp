import React from "react";
import ServiceAnswerService from "../services/ServiceAnswerService";
import { Link } from "react-router-dom";
import "./ServiceQuestions.scss";
import "./table.scss";

class ServiceAnswers extends React.Component {
    constructor(props) {
        super(props)
        this.serviceAnswerService = ServiceAnswerService.getInstance()
        this.state = {
            serviceAnswers: [],
            newAnswer: ""
        }
    }
    componentDidMount() {
        this.getServiceAnswers()
    }

  getServiceAnswers() {
    this.serviceAnswerService.findAllServiceAnswers().then(serviceAnswers => {
      if (serviceAnswers.length) {
        this.setState({
          serviceAnswers: serviceAnswers
        });
      }
    });
  }

  addServiceAnswer = () => {
    const newAnswer  = this.state.newAnswer;
    this.serviceAnswerService
      .addServiceAnswer({ answer: newAnswer })
      .then(res => {
        this.getServiceAnswers();
        this.setState({ newAnswer: "" });
      });
  };


  deleteServiceAnswer = (aId) => {
    this.serviceAnswerService
      .deleteServiceAnswer(aId)
      .then(res => this.getServiceAnswers());
  };


  render() {
    const { serviceAnswers, newAnswer } = this.state;

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
              <td />
              <td />
              <td>
                <input value={this.state.newAnswer} name="answer" onChange={this.handleAnswerInput} />
              </td>
              <td>
                <button onClick={this.addAnswer}>
                  <i className="fas fa-plus-square" />
                </button>
              </td>
              <td />
            </tr>
            {this.state.serviceAnswers.map((serviceAnswer) => (
                <tr key={serviceAnswer.id}>
                  <td>{serviceAnswer}</td>
                  <td>
                    <Link to={`/admin/service-answers/${serviceAnswer.id}`}>
                      {serviceAnswer.choiceAnswer}
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        this.deleteAnswer(serviceAnswer.id);
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ServiceAnswers;
