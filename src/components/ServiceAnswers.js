import React from "react";
import ServiceAnswerService from "../services/ServiceAnswerService";
import { Link } from "react-router-dom";
import "./ServiceQuestions.scss";
import "./table.scss";

class ServiceAnswers extends React.Component {
    constructor(props) {
        super(props)
        this.serviceAnswerService = ServiceAnswerService.getInstance()
        this.state = {
            serviceAnswers: []
        }
    }
    componentDidMount() {
        this.serviceAnswerService
            .findAllServiceAnswers()
            .then(serviceAnswers =>
                this.setState({
                    serviceAnswers: serviceAnswers
                })
            )
    }
    render() {
        return(
            <div>
                <h3>Service Answers</h3>
                <table className="table">
                    <tbody>
                    <tr className="header-row">
                            <td>Question</td>
                            <td>Answer</td>
                    </tr>
                    {this.state.serviceAnswers.map((serviceAnswer) => (
                            <tr key={serviceAnswer.id}>
                                <td>
                                    {serviceAnswer.serviceQuestion}
                                </td>
                                <td><Link to={`/admin/service-answers/${serviceAnswer.id}`}>{serviceAnswer.id}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ServiceAnswers;
