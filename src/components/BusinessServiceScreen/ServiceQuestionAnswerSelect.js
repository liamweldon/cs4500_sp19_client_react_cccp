import React from "react";

const ServiceQuestionAnswerSelect = props => {
  const clickedService = props.clickedSelectedService;

  const serviceItemStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  const questionsAnswers = () =>
    clickedService ? (
      <div>
        <div>{clickedService.serviceName}</div>
        <div>
          <i class="fa fa-times" />
        </div>
      </div>
    ) : (
      <div>
        <div>No service...</div>
        <div>
          <i class="fa fa-times" />
        </div>
      </div>
    );

  return (
    <div>
      <h4>Service Question Answer Select</h4>
      <ul className="list-group">
        <li className="list-group-item" style={serviceItemStyle}>
          {questionsAnswers()}
        </li>
      </ul>
    </div>
  );
};

export default ServiceQuestionAnswerSelect;
