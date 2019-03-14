import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService'
import './table.scss';
import {Link} from 'react-router-dom';
class ServiceQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.serviceQuestionService = ServiceQuestionService.getInstance()
        this.state = {
            serviceQuestions: [],
            newServiceQuestion: {
              serviceType: '',
              type: '',
              question: ''
            }
        }
    }

    getServiceQuestions = () => {
      this.serviceQuestionService.findAllServiceQuestions().then((questions) =>
        this.setState({
          serviceQuestions: questions
        })
      );
    };

    componentDidMount() {
        this.serviceQuestionService
            .findAllServiceQuestions()
            .then(serviceQuestions =>
                this.setState({
                    serviceQuestions: serviceQuestions
                })
            )
    }

    handleNewServiceQuestionInputChange = (e) => {
      this.setState({newServiceQuestion: {...this.state.newServiceQuestion, [e.target.name]: e.target.value}});
    };

    addServiceQuestion = () => {
      const newServiceQuestion = this.state.newServiceQuestion;
      this.ServiceQuestionService.addServiceQuestion(newServiceQuestion).then((res) => {
        this.getServiceQuestions();
        this.setState({
          newServiceQuestion: {
          serviceType: '',
          type: '',
          question: ''
        }
      });
    });
  };

    render() {
        return(
            <div>
                <h3>Service Questions</h3>
                <table className="table">
                    <tbody>
                    <tr className="header-row">
                            <td>Type</td>
                            <td>Question</td>
                    </tr>
                    <tr key={-1}>
                      <td>
                        <input value={this.state.newServiceQuestion.service} name="service" onChange={this.handleNewServiceQuestionInputChange} />
                      </td>
                      <td>
                        <select
                          value={this.state.newServiceQuestion.type}
                          name="type"
                          onChange={this.handleNewServiceQuestionInputChange}
                        />
                      </td>
                      <td>
                        <input
                          value={this.state.newServiceQuestion.question}
                          name="question"
                          onChange={this.handleNewServiceQuestionInputChange}
                        />
                      </td>


                    </tr>
                    {this.state.serviceQuestions.map((serviceQuestion) => (
                            <tr key={serviceQuestion.id}>
                                <td>
                                    {serviceQuestion.type}
                                </td>
                                <td><Link to={`/admin/service-questions/${serviceQuestion.id}`}>{serviceQuestion.question}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ServiceQuestions
