import React from 'react';
import FAQService from '../services/FAQService';
class FAQDetails extends React.Component {
  constructor(props) {
    super(props);
    this.faqService = FAQService.getInstance();
    this.state = {
      faqs: [],
      faq: {
        choiceAnswer: '',
        id: 1
      }
    };
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    this.faqService.findAllFAQs().then((faqs) => {
      const selectedFaq = faqs.find((faq) => faq.id === id) || faqs[0];
      this.setState({
        faqs: faqs,
        faq: selectedFaq
      });
    });
  }
  selectFAQ = (id) =>
    this.faqService.findFAQById(id).then((faq) => {
      this.setState({
        faq: faq
      });
    });
  render() {
    return (
      <div>
        <h3>FAQ Details</h3>
        <label>Title</label>
        <select value={this.state.faq.id} onChange={(e) => this.selectFAQ(e.target.value)} className="form-control">
          {this.state.faqs.map((faq) => (
            <option value={faq.id} key={faq.id}>
              {faq.title}
            </option>
          ))}
        </select>
        <label>Question</label>
        <br />
        <input onChange={() => {}} className="form-control" value={this.state.faq.question} />
      </div>
    );
  }
}

export default FAQDetails;
