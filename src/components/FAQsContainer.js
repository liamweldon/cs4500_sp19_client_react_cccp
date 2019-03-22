import React from 'react';
import FAQService from '../services/FAQService';
import './table.scss';
import './FAQs.scss';
import FAQs from './FAQs.js';
import {omit} from 'lodash';

class FAQsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.faqService = FAQService.getInstance();
    this.state = {
      faqs: [],
      // key value pairs where the key is the ID and the value is the fields
      // ex {0: {title: '', question: ''}, 1: {title: '', question: ''}}
      editing: {},
      newQuestion: {title: '', question: ''}
    };
  }

  getFAQs = () => {
    this.faqService.findAllFAQs().then((faqs) => {
      if (faqs.length) {
        this.setState({
          faqs: faqs
        });
      }
    });
  };

  componentDidMount() {
    this.getFAQs();
  }

  deleteQuestion = (id) => {
    // once the question is deleted, reload the questions so the user doesnt see the deleted one
    this.faqService.deleteFAQ(id).then((res) => this.getFAQs());
  };

  saveQuestion = (id) => {
    const newQuestion = this.state.editing[id];
    this.faqService.editFAQ(id, newQuestion).then((res) => {
      this.getFAQs();
      this.setState({editing: omit(this.state.editing, id)});
    });
  };

  handleNewQuestionInputChange = (e) => {
    this.setState({newQuestion: {...this.state.newQuestion, [e.target.name]: e.target.value}});
  };

  addQuestion = () => {
    const newQuestion = this.state.newQuestion;
    this.faqService.addFAQ(newQuestion).then((res) => {
      this.getFAQs();
      this.setState({newQuestion: {title: '', question: ''}});
    });
  };

  handleInputChange = (e, id) => {
    let editingCopy = {...this.state.editing};
    editingCopy[id] = {...editingCopy[id], [e.target.name]: e.target.value};
    this.setState({editing: editingCopy});
  };

  toggleEditMode = (question) => {
    if (question.id in this.state.editing) {
      this.setState({editing: omit(this.state.editing, question.id)});
    } else {
      this.setState({
        editing: {...this.state.editing, [question.id]: {title: question.title, question: question.question}}
      });
    }
  };

  render() {
    const eventHandlers = {
      handleDeleteClick: this.deleteQuestion,
      handleNewQuestionInputChange: this.handleNewQuestionInputChange,
      handleInputChange: this.handleInputChange,
      handleSaveClick: this.saveQuestion,
      handleEditClick: this.toggleEditMode,
      handleAddClick: this.addQuestion
    };

    return (
      <FAQs
        faqs={this.state.faqs}
        editing={this.state.editing}
        newQuestion={this.state.newQuestion}
        eventHandlers={eventHandlers}
      />
    );
  }
}

export default FAQsContainer;
