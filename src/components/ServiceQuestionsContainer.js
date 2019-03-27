import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService';
import ServiceService from "../services/ServiceService";
import ServiceQuestions from './ServiceQuestions.js';
import './table.scss';
import {Link} from 'react-router-dom';
import {omit} from 'lodash';

class ServiceQuestionsContainer extends React.Component {
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
    const eventHandlers = {
      handleNewServiceQuestionInputChange: this.handleNewServiceQuestionInputChange,
      handleInputChange: this.handleInputChange,
      handleCreateClick: this.addServiceQuestion,
      handleDeleteClick: this.deleteQuestion,
      handleEditClick: this.toggleEditMode,
      handleSaveClick: this.saveServiceQuestion
    }

    return (
      <ServiceQuestions
        serviceQuestions={this.state.serviceQuestions}
        services={this.state.services}
        editing={this.state.editing}
        newServiceQuestion={this.state.newServiceQuestion}
        eventHandlers={eventHandlers}
      />

    );
  }
}

export default ServiceQuestionsContainer;
