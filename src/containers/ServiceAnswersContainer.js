import React from 'react';
import ServiceAnswerService from '../services/ServiceAnswerService';
import ServiceQuestionService from '../services/ServiceQuestionService';
import '../components/table.scss';
import '../components/ServiceQuestions.scss';
import {omit} from 'lodash';
import ServiceAnswers from '../components/ServiceAnswers.js';

class ServiceAnswersContainer extends React.Component {
    constructor(props) {
        super(props)
        this.serviceAnswerService = ServiceAnswerService.getInstance()
        this.serviceQuestionService = ServiceQuestionService.getInstance()
        this.state = {
            serviceAnswers: [],
            serviceQuestions: [],
            editing: {},
            newAnswer: {
                 type: '',
                 question: '',
                 answer: ''
               }
        }
    }
    componentDidMount() {
        this.serviceAnswerService
            .findAllServiceAnswers()
            .then(serviceAnswers =>
                this.setState({
                    serviceAnswers: serviceAnswers
                })
            );
        this.serviceQuestionService
            .findAllServiceQuestions()
            .then(serviceQuestions =>
                this.setState({
                    serviceQuestions: serviceQuestions
                })
            );
        }

      getServiceAnswers = () => {
        this.serviceAnswerService.findAllServiceAnswers().then((answers) =>
          this.setState({
            serviceAnswers: answers
          })
        );
      };

    saveServiceAnswer = (id) => {
      const newAnswer = this.state.editing[id];
      this.serviceAnswerService.editServiceAnswer(id, newAnswer).then((res) => {
        this.getServiceAnswers();
        this.setState({editing: omit(this.state.editing, id)});
      });
    };

      handleInputChange = (e, id) => {
        let editingCopy = {...this.state.editing};
        editingCopy[id] = {...editingCopy[id], [e.target.name]: e.target.value};
        this.setState({editing: editingCopy});
      };

      handleNewServiceAnswerInputChange = (e) => {
        this.setState({newAnswer: {...this.state.newAnswer, [e.target.name]: e.target.value}});
      };

      addServiceAnswer = () => {
        const newAnswer = this.state.newAnswer;
        this.serviceAnswerService.addServiceAnswer(newAnswer).then((res) => {
          this.getServiceAnswers();
          this.setState({
            newAnswer: {
              type: '',
              question: '',
              answer: ''
          }
        });
      });
    };

      deleteServiceAnswer = (id) => {
        // once the answer is deleted, reload the answers so the user doesnt see the deleted one
        this.serviceAnswerService.deleteServiceAnswer(id).then((res) => this.getServiceAnswers());
      };

    toggleEditMode = (serviceAnswer) => {
      if (serviceAnswer.id in this.state.editing) {
        this.setState({editing: omit(this.state.editing, serviceAnswer.id)});
      } else {
        this.setState({
          editing: {...this.state.editing, [serviceAnswer.id]: {
            type: serviceAnswer.type,
            question: serviceAnswer.question,
            answer: serviceAnswer.choiceAnswer}
          }
        });
      }
    };

      render() {
          const eventHandlers = {
            handleNewServiceAnswerInputChange: this.handleNewServiceAnswerInputChange,
            handleInputChange: this.handleInputChange,
            addServiceAnswer: this.addServiceAnswer,
            deleteServiceAnswer: this.deleteServiceAnswer,
            toggleEditMode: this.toggleEditMode,
            saveServiceAnswer: this.saveServiceAnswer
          }

        return (
          <ServiceAnswers
            serviceAnswers={this.state.serviceAnswers}
            serviceQuestions={this.state.serviceQuestions}
            newAnswer={this.state.newAnswer}
            editing={this.state.editing}
            eventHandlers={eventHandlers}
            />
        );
      }
    }
export default ServiceAnswersContainer;
