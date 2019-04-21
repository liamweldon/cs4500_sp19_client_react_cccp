import React from "react";
import QuestionTypeRenderers from "./QuestionAnswer";

const ServiceQuestionAnswerSelect = props => {
  const clickedService = props.clickedSelectedService;
  const allQuestions = clickedService ? clickedService.serviceQuestions : [];

  const questionRenderers = QuestionTypeRenderers;

  const renderQuestionsAnswers = () => {
    return (
      <div className="question-answer-div">
        <br />
        <h5>{clickedService.serviceName}</h5>
        <div className="all-questions">
          {allQuestions.map(currentQuestion => {
            return questionRenderers[currentQuestion.questionType](
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
