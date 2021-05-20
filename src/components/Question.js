import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../Store/actions";

class Question extends Component {
  state = {
    answer: "",
    quesId: "",
  };

  handleOption = (e, id) => {
    this.setState({
      answer: e,
      quesId: id,
    });
    console.log("you choose ", this.state.answer);
  };

  handleSaveQuestionAnswer = () => {
    if (this.state.answer !== "") {
      this.props.saveQuestionAnswer({
        authedUser: this.props.authedUser,
        qid: this.state.quesId,
        answer: this.state.answer,
      });

      this.setState({
        answer: "",
        quesId: "",
      });

      console.log("your answer was sent");
    } else {
      alert("You must choose one");
    }
  };

  render() {
    const questionId = window.location.pathname.split("/questions/")[1];

    const questions = Object.entries(this.props.questions).map((question) => {
      return question[1];
    });

    const question = questions.filter((ques) => {
      return ques.id === questionId;
    })[0];

    const users = Object.entries(this.props.users).map((user) => {
      return user[1];
    });

    const user = users.filter((user) => {
      return user.id === question.author;
    })[0];

    // console.log(document.querySelector('#option1'));
    // console.log(questions);
    // console.log(question);
    // console.log(questionId);
    // console.log(users);
    // console.log(user);

    return (
      <div className="showQuestion">
        <h4 className="title">Question number : </h4>
        <div className="contents">
          <div
            className="authorImg"
            style={{
              backgroundImage: `url(${user.avatarURL})`,
            }}
          ></div>
          <div className="options">
            <p className="quesAuthor">
              Author : <span>{user.name}</span>
            </p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="optionOne"
                onChange={(e) => this.handleOption(e.target.id, question.id)}
              />
              <label className="form-check-label" for="option1">
                {question.optionOne.text}
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="optionTwo"
                onChange={(e) => this.handleOption(e.target.id, question.id)}
              />
              <label className="form-check-label" for="option2">
                {question.optionTwo.text}
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSaveQuestionAnswer}
            >
              Submit answer
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.AuthedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveQuestionAnswer: (answer) => {
      dispatch(actions.SAVE_QUESTION_ANSWER(answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
