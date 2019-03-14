import React from 'react';
import FAQService from '../services/FAQService';
import './table.scss';
import {Link} from 'react-router-dom';
import './FAQs.scss';
import {omit} from 'lodash';

class FAQs extends React.Component {
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
    this.faqService.findAllFAQs().then((faqs) =>
      this.setState({
        faqs: faqs
      })
    );
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
    return (
      <div>
        <h3>Frequently Asked Questions</h3>
        <table className="table faqs">
          <tbody>
            <tr className="header-row">
              <td>Title</td>
              <td>Question</td>
              <td />
              <td />
            </tr>
            <tr key={-1}>
              <td>
                <input value={this.state.newQuestion.title} name="title" onChange={this.handleNewQuestionInputChange} />
              </td>
              <td>
                <input
                  value={this.state.newQuestion.question}
                  name="question"
                  onChange={this.handleNewQuestionInputChange}
                />
              </td>
              <td>
                <button onClick={this.addQuestion}>
                  <i className="fas fa-plus-square" />
                </button>
              </td>
              <td />
            </tr>
            {this.state.faqs.map((faq) => (
              <tr key={faq.id}>
                <td>
                  {faq.id in this.state.editing ? (
                    <input
                      value={this.state.editing[faq.id].title}
                      name="title"
                      onChange={(e) => {
                        this.handleInputChange(e, faq.id);
                      }}
                    />
                  ) : (
                    <Link to={`/admin/faqs/${faq.id}`}>{faq.title}</Link>
                  )}
                </td>
                <td>
                  {faq.id in this.state.editing ? (
                    <input
                      defaultValue={this.state.editing[faq.id].question}
                      name="question"
                      onChange={(e) => {
                        this.handleInputChange(e, faq.id);
                      }}
                    />
                  ) : (
                    faq.question
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.deleteQuestion(faq.id);
                    }}
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </td>
                <td>
                  {faq.id in this.state.editing ? (
                    <i
                      className="fas fa-check-square"
                      onClick={() => {
                        this.saveQuestion(faq.id);
                      }}
                    />
                  ) : (
                    <i className="fas fa-pen-square" onClick={() => this.toggleEditMode(faq)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FAQs;
