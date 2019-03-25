import React from 'react'
import FAQService from '../services/FAQService'
import FAQDetails from './FAQDetails'
import {Link} from 'react-router-dom';

  class FAQDetailsContainer extends React.Component {
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

    setFAQ = (faq) => {
        this.setState(faq);
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
        return (
            <FAQDetails
                faqs={this.state.faqs}
                faq={this.state.faq}
                selectFAQ={this.selectFAQ}
                addFAQ={this.addFAQ}
                deleteFAQ={this.deleteFAQ}
                updateFAQ={this.updateFAQ}
                setFAQ={this.setFAQ}/>
        );
    }

}
export default FAQDetailsContainer;