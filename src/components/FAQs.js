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
      editing: {}
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

  editQuestion = () => {};

  toggleEditMode = (question) => {
    if (question.id in this.state.editing) {
      this.setState({editing: omit(this.state.editing, question.id)});
    } else {
      let editingCopy = {...this.state.editing};
      editingCopy[question.id] = {title: question.title, question: question.question};
      this.setState({editing: editingCopy});
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
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <button onClick={() => {}}>
                  <i className="fas fa-plus-square" />
                </button>
              </td>
              <td />
            </tr>
            {this.state.faqs.map((faq) => (
              <tr key={faq.id}>
                <td>
                  {faq.id in this.state.editing ? <input /> : <Link to={`/admin/faqs/${faq.id}`}>{faq.title}</Link>}
                </td>
                <td>{faq.id in this.state.editing ? <input /> : faq.question}</td>
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
                  <i className="fas fa-pen-square" onClick={() => this.toggleEditMode(faq)} />
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
