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

    const AuthUser = users.filter((user) => {
      return user.id === this.props.authedUser;
    })[0].answers;

    const answersOfAuthUser = Object.entries(AuthUser).map((answer) => {
      return { id: answer[0], option: answer[1] };
    });
    let answerStatus = "unanswered";
    for (let i = 0; i < answersOfAuthUser.length; i++) {
      const element = answersOfAuthUser[i];
      if (element.id === questionId) {
        answerStatus = "answered";
      }
    }
    // console.log(document.querySelector('#option1'));
    // console.log(questions);
    console.log(question);
    // console.log(questionId);
    // console.log(users);
    // console.log(user);
    // console.log('answers :: ', answersOfAuthUser, ' status :: ', answerStatus);

    // when question is answered show this
    if (answerStatus === "answered") {
      return (
        <div className="showQuestion">
          <h4 className="title">
            Question status : <span>{answerStatus}</span>
          </h4>
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
              <div className="form-check option">
                <span>- Option one : </span>
                <label className="form-check-lbl" htmlFor="option1">
                  {question.optionOne.text}
                </label>
                <p className="votes">
                  People who voted for that option:{" "}
                  <span>{question.optionOne.votes.length}</span>
                </p>
                <div
                  className="progress"
                  style={{
                    background: "#aaa",
                  }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={Math.floor(
                      (question.optionOne.votes.length / 3) * 100
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${Math.floor(
                        (question.optionOne.votes.length / 3) * 100
                      )}%`,
                    }}
                  >
                    {Math.floor((question.optionOne.votes.length / 3) * 100)}%
                    votes
                  </div>
                </div>
              </div>
              <div className="form-check option">
                <span>- Option two : </span>
                <label className="form-check-lbl" htmlFor="option2">
                  {question.optionTwo.text}
                </label>
                <p className="votes">
                  People who voted for that option:{" "}
                  <span>{question.optionTwo.votes.length}</span>
                </p>
                <div
                  className="progress"
                  style={{
                    background: "#aaa",
                  }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={Math.floor(
                      (question.optionTwo.votes.length / 3) * 100
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${Math.floor(
                        (question.optionTwo.votes.length / 3) * 100
                      )}%`,
                    }}
                  >
                    {Math.floor((question.optionTwo.votes.length / 3) * 100)}%
                    votes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // if question is not answered show this
    return (
      <div className="showQuestion">
        <h4 className="title">
          Question status : <span>{answerStatus}</span>
        </h4>
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
              <label className="form-check-label" htmlFor="option1">
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
              <label className="form-check-label" htmlFor="option2">
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
