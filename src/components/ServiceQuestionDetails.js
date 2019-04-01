import React from 'react'
import ServiceQuestionService from '../services/ServiceQuestionService'
import {Link} from 'react-router-dom';
const ServiceQuestionDetails = ({serviceQuestions, serviceQuestion, selectServiceQuestion}) => (
          <div className="servicequestiondetails">
                <h3>Service Question Details</h3>
                <select
                    value={serviceQuestion.id}
                    onChange={(e) => selectServiceQuestion(e.target.value)}
                    className="form-control">
                    {
                        serviceQuestions
                            .map(q =>
                                <option
                                    value={q.id}
                                    key={q.id}>
                                    {q.question}
                                </option>
                            )
                    }
                </select>
                <label>Service Question Question</label><br/>
                <input
                    onChange={() => {}}
                    className="form-control"
                    value={serviceQuestion.title}/>
            </div>
        )



export default ServiceQuestionDetails;
