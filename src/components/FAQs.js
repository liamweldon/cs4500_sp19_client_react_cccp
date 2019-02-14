import React from 'react';
import FAQService from '../services/FAQService';
import './table.scss';
import {Link} from 'react-router-dom';

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
    render() {
        return (
            <div>
                <h3>Frequently Asked Questions</h3>
                <table className="table">
                    <tbody>
                        <tr className="header-row">
                            <td>Question</td>
                        </tr>
                        {this.state.faqs.map((faq) => (
                            <tr key={faq.id}>
                                <td>
                                    <Link to={`/admin/faqs/${faq.id}`}>{faq.title}</Link>
                                </td>
                                <td>{faq.question}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default FAQs;
