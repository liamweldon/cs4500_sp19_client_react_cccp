import React from "react";

const questionAnswerContainerStyle = {
  display: "flex",
  justifyContent: "space-between"
};

const multipleChoiceHTML = question => {
  return (
    <li className="list-group-item" key={question.id}>
      <div className="question-title" style={questionAnswerContainerStyle}>
        <h6>{question.question}</h6>
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
        <h6>{question.question}</h6>
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

const QuestionTypeRenderers = {
  "MULTIPLE-CHOICE": multipleChoiceHTML,
  "MULTIPLE-ANSWER": multipleAnswerHTML
};

export default QuestionTypeRenderers;
