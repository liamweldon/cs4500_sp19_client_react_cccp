import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService';
import ServiceService from "../services/ServiceService";
import './table.scss';
import {Link} from 'react-router-dom';
import {omit} from 'lodash';
class ServiceQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.serviceQuestionService = ServiceQuestionService.getInstance()
        this.serviceService = ServiceService.getInstance();
        this.state = {
            serviceQuestions: [],
            services: [],
            editing: {},
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

      deleteQuestion = (id) => {
        // once the question is deleted, reload the questions so the user doesnt see the deleted one
        this.serviceQuestionService.deleteServiceQuestion(id).then((res) => this.getServiceQuestions());
      };

    saveServiceQuestion = (id) => {
      const newServiceQuestion = this.state.editing[id];
      this.serviceQuestionService.editServiceQuestion(id, newServiceQuestion).then((res) => {
        this.getServiceQuestions();
        this.setState({editing: omit(this.state.editing, id)});
      });
    };

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

  handleInputChange = (e, id) => {
    let editingCopy = {...this.state.editing};
    editingCopy[id] = {...editingCopy[id], [e.target.name]: e.target.value};
    this.setState({editing: editingCopy});
  };

  toggleEditMode = (serviceQuestion) => {
    if (serviceQuestion.id in this.state.editing) {
      this.setState({editing: omit(this.state.editing, serviceQuestion.id)});
    } else {
      this.setState({
        editing: {...this.state.editing, [serviceQuestion.id]: {
          serviceName: serviceQuestion.serviceName,
          type: serviceQuestion.type,
          question: serviceQuestion.question}
        }
      });
    }
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
                              {serviceQuestion.id in this.state.editing ? (
                                <input
                                value={this.state.editing[serviceQuestion.id].type}
                                name="type"
                                onChange={(e) => {
                                  this.handleInputChange(e, serviceQuestion.id);
                                }}
                                />
                              ) : (
                                <Link to={`/admin/service-questions/${serviceQuestion.id}`}>{serviceQuestion.type}</Link>
                              )}
                              </td>
                              <td>
                              {serviceQuestion.id in this.state.editing ? (
                                <input
                                defaultValue={this.state.editing[serviceQuestion.id].question}
                                name="question"
                                onChange={(e) => {
                                  this.handleInputChange(e, serviceQuestion.id);
                                }}
                                />
                              ) : (
                                serviceQuestion.question
                              )}
                              </td>
                                <td>
                                  <button
                                    onClick={() => {
                                      this.deleteQuestion(serviceQuestion.id);
                                    }}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </button>
                                </td>

                                <td>
                                  {serviceQuestion.id in this.state.editing ? (
                                    <i
                                    className="fas fa-check-square"
                                    onClick={() => {
                                      this.saveServiceQuestion(serviceQuestion.id);
                                    }}
                                    />
                                  ) : (
                                    <i className="fas fa-pen-square" onClick={() => this.toggleEditMode(serviceQuestion)} />
                                  )}
                                </td>

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
