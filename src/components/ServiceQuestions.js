import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService';
import ServiceService from "../services/ServiceService";
import './table.scss';
import {Link} from 'react-router-dom';
class ServiceQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.serviceQuestionService = ServiceQuestionService.getInstance()
        this.serviceService = ServiceService.getInstance();
        this.state = {
            serviceQuestions: [],
            services: [],
            newServiceQuestion: {
              serviceName: '',
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
            );
        this.serviceService
            .findAllServices()
            .then(services =>
                this.setState({
                    services: services
                })
            );
    }

    handleNewServiceQuestionInputChange = (e) => {
      this.setState({newServiceQuestion: {...this.state.newServiceQuestion, [e.target.name]: e.target.value}});
    };


    addServiceQuestion = () => {
      const newServiceQuestion = this.state.newServiceQuestion;
      this.serviceQuestionService.addServiceQuestion(newServiceQuestion).then((res) => {
        this.getServiceQuestions();
        this.setState({
          newServiceQuestion: {
            serviceName: '',
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
                            <td>Service</td>
                            <td>Type</td>
                            <td>Question</td>
                    </tr>
                    <tr key={-1}>
                      <td>
                        <select
                            value={this.state.serviceName}
                            name="serviceName"
                            onChange={this.handleNewServiceQuestionInputChange}>
                            {this.state.services.map(service => (
                              <option value={service.serviceName}>{service.serviceName}</option>
                            ))}
                        </select>
                      </td>
                      <td>
                        <select
                          name="type"
                          onChange={this.handleNewServiceQuestionInputChange}>
                          <option value="Choice">Choice</option>
                          <option value="True/False">True/False</option>
                          <option value="Range">Range</option>
                        </select>
                      </td>
                      <td>
                        <input
                          value={this.state.newServiceQuestion.question}
                          name="question"
                          onChange={this.handleNewServiceQuestionInputChange}
                        />
                      </td>
                      <td>
                        <button onClick={this.addServiceQuestion}>
                          Create +
                        </button>
                      </td>
                    </tr>
                    {this.state.serviceQuestions.map((serviceQuestion) => (
                            <tr key={serviceQuestion.id}>
                                <td>
                                    {serviceQuestion.serviceName}
                                </td>
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
