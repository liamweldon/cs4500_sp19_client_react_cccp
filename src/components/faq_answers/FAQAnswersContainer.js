import React from "react";
import FAQAnswerService from "../../services/FAQAnswerService";
import FAQService from "../../services/FAQService";
import FAQAnswers from "./FAQAnswers";

class FAQAnswersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.faqAnswerService = FAQAnswerService.getInstance();
    this.faqService = FAQService.getInstance();
    this.state = {
      faqs: [],
      newAnswer: "",
      selectedQuestion: ""
    };
  }
  componentDidMount() {
    this.getFAQs();
  }

  handleQuestionSelector = evt => {
    this.setState({ selectedQuestion: evt.target.value });
  };

  handleAnswerInput = evt => {
    this.setState({ newAnswer: evt.target.value });
  };

  getFAQs = () => {
    this.faqService.findAllFAQs().then(faqs => {
      if (faqs.length) {
        this.setState({
          faqs: faqs,
          selectedQuestion: faqs[0].id
        });
      }
    });
  };

  addAnswer = () => {
    const { selectedQuestion, newAnswer } = this.state;
    this.faqAnswerService
      .addFAA(selectedQuestion, { answer: newAnswer })
      .then(res => {
        this.getFAQs();
        this.setState({ newAnswer: "" });
      });
  };

  deleteAnswer = (questionId, faaId) => {
    this.faqAnswerService
      .deleteFAA(questionId, faaId)
      .then(res => this.getFAQs());
  };

  render() {
    const eventHandlers = {
      deleteAnswer: this.deleteAnswer,
      handleQuestionSelector: this.handleQuestionSelector,
      handleAnswerInput: this.handleAnswerInput,
      addAnswer: this.addAnswer
    };

    return <FAQAnswers {...this.state} eventHandlers={eventHandlers} />;
  }
}

export default FAQAnswersContainer;
