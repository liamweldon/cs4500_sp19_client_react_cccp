import React from "react";
import { Link } from "react-router-dom";
import "./ServiceQuestions.scss";
import "./table.scss";


const ServiceAnswers = ({serviceAnswers, serviceQuestions, editing, newAnswer, eventHandlers}) => (
            <div>
                <h3>Service Answers</h3>
                <table className="table">
                    <tbody>
                    <tr className="header-row">
                            <td>Question</td>
                            <td>Type</td>
                            <td>Answer</td>
                         </tr>
                        <tr key={-1}>
                        <select
                            value={newAnswer.question}
                            name="question"
                            onChange={eventHandlers.handleNewServiceAnswerInputChange}>
                            {serviceQuestions.map(serviceQuestion => (
                              <option value={serviceQuestion.question}>{serviceQuestion.question}</option>
                            ))}
                        </select>
                          <td>
                            <select
                              name="type"
                              onChange={eventHandlers.handleNewServiceAnswerInputChange}>
                              <option value="Choice">Choice</option>
                              <option value="True/False">True/False</option>
                              <option value="Range">Range</option>
                            </select>
                          </td>
                          <td>
                            <input
                              value={newAnswer.answer}
                              name="answer"
                              onChange={eventHandlers.handleNewServiceAnswerInputChange}
                            />
                          </td>
                        <td>
                          <button onClick={eventHandlers.addServiceAnswer}>
                            Create +
                          </button>
                        </td>
                        </tr>
                    {serviceAnswers.map((serviceAnswer) => (
                        <tr key={serviceAnswer.id} className="answer-row">
                        <td>
                        {serviceAnswer.question}
                        </td>
                        <td>
                        {serviceAnswer.type}
                        </td>
                        <td><Link to={`/admin/service-answers/${serviceAnswer.id}`}>{serviceAnswer.id}</Link></td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              eventHandlers.deleteServiceAnswer(serviceAnswer.id);
                            }}
                          >
                            <i className="fas fa-trash-alt" />
                          </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )

export default ServiceAnswers;