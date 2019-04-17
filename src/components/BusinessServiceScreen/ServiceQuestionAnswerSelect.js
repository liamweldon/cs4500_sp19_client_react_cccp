import React from "react";

const ServiceQuestionAnswerSelect = props => {
  const questionAnswerContainerStyle = {
    display: "flex",
    justifyContent: "space-between"
  };

  const clickedService = props.clickedSelectedService;
  const allQuestions = clickedService ? clickedService.serviceQuestions : [];

  const multipleChoiceHTML = question => {
    return (
      <li className="list-group-item" key={question.id}>
        <div className="question-title" style={questionAnswerContainerStyle}>
          <div>{question.question}</div>
          <div>{question.id}</div>
        </div>
        <form className="question-answers">
          {question.choices.map(currentAnswer => {
            return (
              <div className="form-check" key={currentAnswer.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={question.id}
                  id={currentAnswer.id}
                  value={currentAnswer.id}
                />
                <label className="form-check-label" htmlFor={currentAnswer.id}>
                  {currentAnswer.title}
                </label>
              </div>
            );
          })}
        </form>
      </li>
    );
  };

  const multipleAnswerHTML = question => {
    return (
      <li className="list-group-item" key={question.id}>
        <div className="question-title" style={questionAnswerContainerStyle}>
          <div>{question.question}</div>
          <div>{question.id}</div>
        </div>
        <form className="question-answers">
          {question.choices.map(currentAnswer => {
            return (
              <div className="form-check" key={currentAnswer.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={currentAnswer.id}
                  id={currentAnswer.id}
                />
                <label className="form-check-label" htmlFor={currentAnswer.id}>
                  {currentAnswer.title}
                </label>
              </div>
            );
          })}
        </form>
      </li>
    );
  };

  const questionTypeToRenderFunction = {
    "MULTIPLE-ANSWER": multipleAnswerHTML,
    "MULTIPLE-CHOICE": multipleChoiceHTML
  };

  const renderQuestionsAnswers = () => {
    return (
      <div className="question-answer-div">
        <li className="list-group-item" style={questionAnswerContainerStyle}>
          <h5>{clickedService.serviceName}</h5>
          <h5>{clickedService.id}</h5>
        </li>
        <div className="all-questions">
          {allQuestions.map(currentQuestion => {
            return questionTypeToRenderFunction[currentQuestion.questionType](
              currentQuestion
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4>Service Question Answer Select</h4>
      <ul className="list-group list-group-flush">
        {clickedService ? renderQuestionsAnswers() : undefined}
      </ul>
    </div>
  );
};

export default ServiceQuestionAnswerSelect;
