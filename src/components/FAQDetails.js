import React from 'react'
import FAQService from '../services/FAQService'
import {Link} from 'react-router-dom';
import './FAQDetails.scss'
class FAQDetails extends React.Component {
    constructor(props) {
        super(props)
        this.faqService = FAQService.getInstance()
        this.state = {
            faqs: [],
            faq: {
                choiceAnswer: '',
                id: 1
            }
        }
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
    
    selectFAQ = id =>
        this.faqService
            .findFAQById(id)
            .then(faq => {
                    this.props.history.push("/admin/faqs/" + id)
                    this.setState({
                        faq: faq
                    })
                }
            )
    toSummary = () => {
        this.props.history.push('/admin/faqs')
    }

    addFAQ = () => {
        let newFaq = {title: this.state.faq.title, question: this.state.faq.question};
        this.faqService.addFAQ(newFaq).then(this.toSummary());
    };

    deleteFAQ = () => {
        this.faqService.deleteFAQ(this.state.faq.id).then(this.toSummary());
    };

    updateFAQ = () => {
        this.faqService.editFAQ(this.state.faq.id, this.state.faq).then(this.toSummary());
    };


    render() {
        return(
            <div className="faqdetails">
                <h3>FAQ Details</h3>
                <select
                    value={this.state.faq.id}
                    onChange={(e) => this.selectFAQ(e.target.value)}
                    className="form-control">
                    {
                        this.state.faqs
                            .map(faq =>
                                <option
                                    value={faq.id}
                                    key={faq.id}>
                                    {faq.id}
                                </option>
                            )
                    }
                </select>
                <label>Title</label>
                <input
                    value={this.state.faq.title}
                    className="form-control"
                    onChange={(e) => {
                        let newFaq = this.state.faq;
                        newFaq.title = e.target.value;
                        this.setState(newFaq)}}>
                </input>
                <label>Question</label><br/>
                <input
                    onChange={(e) => {
                        let newFaq = this.state.faq;
                        newFaq.question = e.target.value;
                        this.setState(newFaq)}}
                    className="form-control"
                    value={this.state.faq.question}/>
                  <Link to={`/admin/faqs`}>                
                <button
                    onClick={() => {
                    }}
                  >
                   <i className="fas fa-arrow-left" />
                  </button>
                  </Link>
                  <button onClick={this.deleteFAQ}>
                    <i className="fas fa-trash-alt" />
                </button>
                  <button
                    onClick={() => {}}
                  >
                    <i className="fas fa-search" />
                  </button>
                  <button
                    onClick={this.addFAQ}
                  >
                    <i className="fas fa-plus-square" />
                  </button>
                  <button
                    onClick={this.updateFAQ}
                  >
                    <i className="fas fa-check-square" />
                  </button>
                  
            </div>
        )
    }
}

export default FAQDetails;
