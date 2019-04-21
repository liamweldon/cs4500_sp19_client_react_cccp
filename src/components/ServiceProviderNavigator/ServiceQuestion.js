import React from 'react'
import ServiceQuestionService from '../../services/ServiceQuestionService'
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
        console.log(this.props);
        const { question, choices } = this.props.serviceQuestion;
        return(
            <div>
                <h5>{question}</h5>
                <table className="table">
                    <tbody>
                    {
                       choices
                            .map((choice, i) =>
                                <div id={choice.id}>
                                    <label>
                                        <input type={"radio"}/>
                                        {" " + choice.title}
                                    </label>
                                </div>
                            )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ServiceQuestions