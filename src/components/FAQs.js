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
  componentDidMount() {
    this.faqService.findAllFAQs().then((faqs) =>
      this.setState({
        faqs: faqs
      })
    );
  }

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
                      this.faqService.deleteFAQ(faq.id);
                    }}
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </td>
                <td>
                  <i class="fas fa-pen-square" onClick={this.editQuestion} />
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
