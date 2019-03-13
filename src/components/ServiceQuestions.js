import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService'
import './table.scss';
import {Link} from 'react-router-dom';
class ServiceQuestions extends React.Component {
    constructor(props) {
        super(props)
        this.serviceQuestionService = ServiceQuestionService.getInstance()
        this.state = {
            serviceQuestions: []
        }
    }
    componentDidMount() {
        this.serviceQuestionService
            .findAllServiceQuestions()
            .then(serviceQuestions =>
                this.setState({
                    serviceQuestions: serviceQuestions
                })
            )
    }
    render() {
        return(
            <div>
                <h3>Service Questions</h3>
                <table className="table">
                    <tbody>
                    <tr className="header-row">
                            <td>Type</td>
                            <td>Question</td>
                    </tr>
                    {this.state.serviceQuestions.map((serviceQuestion) => (
                            <tr key={serviceQuestion.id}>
                                <td>
                                    {serviceQuestion.type}
                                </td>
                                <td><Link to={`/admin/service-questions/${serviceQuestion.id}`}>{serviceQuestion.question}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ServiceQuestions
