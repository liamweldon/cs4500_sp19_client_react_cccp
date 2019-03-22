import React from 'react'
import './table.scss';
import {Link} from 'react-router-dom';
  const ServiceQuestions = (
    {
      serviceQuestions,
      services,
      editing,
      newServiceQuestion,
      eventHandlers
    }) => (
      <div>
          <h3>Service Questions</h3>
          <table className="table">
              <tbody>
              <tr className="header-row">
                      <td>Service</td>
                      <td>Type</td>
                      <td>Question</td>
              </tr>
              <tr key={-1}>
                <td>
                  <select
                      value={newServiceQuestion.serviceName}
                      name="serviceName"
                      onChange={eventHandlers.handleNewServiceQuestionInputChange}>
                      {services.map(service => (
                        <option value={service.serviceName}>{service.serviceName}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <select
                    name="type"
                    onChange={eventHandlers.handleNewServiceQuestionInputChange}>
                    <option value="Choice">Choice</option>
                    <option value="True/False">True/False</option>
                    <option value="Range">Range</option>
                  </select>
                </td>
                <td>
                  <input
                    value={newServiceQuestion.question}
                    name="question"
                    onChange={eventHandlers.handleNewServiceQuestionInputChange}
                  />
                </td>
                <td>
                  <button onClick={eventHandlers.handleCreateClick}>
                    Create +
                  </button>
                </td>
              </tr>
              {serviceQuestions.map((serviceQuestion) => (
                      <tr key={serviceQuestion.id}>
                          <td>
                              {serviceQuestion.serviceName in editing ? (
                                <input
                                value={editing[serviceQuestion.id].type}
                                name="type"
                                onChange={(e) => {
                                  eventHandlers.handleInputChange(e, serviceQuestion.id);
                                }}
                                />
                              ): (
                                serviceQuestion.serviceName
                              )
                            }

                          </td>
                          <td>
                              {serviceQuestion.type}
                          </td>
                          <td>
                              {serviceQuestion.question in editing ? (
                                <input
                                  value={newServiceQuestion.question}
                                  name="question"
                                  onChange={eventHandlers.handleNewServiceQuestionInputChange}
                                />
                              ): (
                                <Link to={`/admin/service-questions/${serviceQuestion.id}`}>{serviceQuestion.question}</Link>
                              )
                            }

                          </td>
                          <td></td>
                          <td>
                            <button
                              onClick={() => {
                                eventHandlers.handleDeleteClick(serviceQuestion.id);
                              }}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                          </td>
                          <td>
                            {serviceQuestion.id in editing ? (
                              <i
                              className="fas fa-check-square"
                              onClick={() => {
                                eventHandlers.handleSaveClick(serviceQuestion.id);
                              }}
                              />
                            ) : (
                              <i className="fas fa-pen-square" onClick={() => eventHandlers.handleEditClick(serviceQuestion)} />
                            )}
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )

export default ServiceQuestions;
