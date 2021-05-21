import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import GuestGreeting from "./GuestGreeting";

class Questions extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      const questions = Object.entries(this.props.questions).map((question) => {
        return question[1];
      });

      // arranged from the most recently created (top) to the least recently created (bottom)
      const newQuestions = questions.sort(function (a, b) {
        return b.timestamp - a.timestamp
      });

      const users = Object.entries(this.props.users).map((user) => {
        return user[1];
      });

      const answersOfAuthUser = users.filter((user) => {
        return user.id === this.props.authedUser;
      })[0].answers;
      
      const mapAnswers = Object.entries(answersOfAuthUser).map((ans) => {
        return { id: ans[0] };
      });

      const showQuestions = newQuestions.map((question) => {
        const author = users.filter((user) => {
          return user.id === question.author;
        })[0];

        let status = "not answered";
        let link = "/questions/" + question.id;
        for (let i = 0; i < mapAnswers.length; i++) {
          const element = mapAnswers[i];
          if (element.id === question.id) {
            status = "answered";
            // link = "#";
          }
        }

        return (
          <div key={question.id} className="questionContainer">
            <NavLink to={link} className="Status btn btn-primary">
              {status}
            </NavLink>
            <div
              className="authorImg"
              style={{
                backgroundImage: `url(${author.avatarURL})`,
              }}
            ></div>
            <p className="quesAuthor">
              Author : <span>{author.name}</span>
            </p>
            <div className="options">
              <div className="optionOne">
                <p className="optionOneTxt">
                  <span>- Option one :</span> {question.optionOne.text}
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
              <div className="optionTwo">
                <p className="optionTwoTxt">
                  <span>- Option two :</span> {question.optionTwo.text}
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
        );
      });
      return (
        <div className="questions">
          <h3 className="title">questions :</h3>
          <div className="questionsContainer">{showQuestions}</div>
        </div>
      );
    }
    return <GuestGreeting />;
  }
}

function mapStateToProps(state) {
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.AuthedUser,
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Questions);
