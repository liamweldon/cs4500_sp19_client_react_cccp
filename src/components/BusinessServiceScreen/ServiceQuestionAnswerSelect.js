import React from "react";

const ServiceQuestionAnswerSelect = props => {
  const serviceItemStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  const clickedService = props.clickedSelectedService;

  const questionsAnswers = () => {
    if (clickedService !== undefined) {
      return (
        <li className="list-group-item" style={serviceItemStyle}>
          <div>{clickedService.serviceName}</div>
          <div>
            <i class="fa fa-times" />
          </div>
        </li>
      );
    }
  };

  return (
    <div>
      <h4>Service Question Answer Select</h4>
      <ul className="list-group">{questionsAnswers()}</ul>
    </div>
  );
};

export default ServiceQuestionAnswerSelect;
