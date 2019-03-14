import React from 'react';
import FAQService from '../services/FAQService';
import './table.scss';
import {Link} from 'react-router-dom';
import './FAQs.scss';

class FAQs extends React.Component {
  constructor(props) {
    super(props);
    this.faqService = FAQService.getInstance();
    this.state = {
      faqs: []
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

  render() {
    return (
      <div>
        <h3>Frequently Asked Questions</h3>
        <table className="table faqs">
          <tbody>
            <tr className="header-row">
              <td>Title</td>
              <td>Question</td>
            </tr>
            {this.state.faqs.map((faq) => (
              <tr key={faq.id}>
                <td>
                  <Link to={`/admin/faqs/${faq.id}`}>{faq.title}</Link>
                </td>
                <td>{faq.question}</td>
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
                  <i className="fas fa-pen-square" onClick={this.editQuestion} />
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
