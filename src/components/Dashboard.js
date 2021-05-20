import React, { Component } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

// import components
import Answers from "./Answers";
import UnAnswers from "./UnAnswers";
import CreatedQues from "./CreatedQues";

// tool to connect to the app
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    // const of the authed user
    const authedUser = this.props.authedUser;

    // const to catch the authed user
    const user = Object.entries(this.props.users)
      .map((ele) => {
        return ele[1];
      })
      .filter((ele) => {
        return ele.id === authedUser;
      })[0];

    // const of the questions created by the authed user
    const questions = Object.entries(this.props.questions).map((ele) => {
      return ele[1];
    });

    // const of all data
    const answersNum = Object.entries(user.answers).length;
    const unAnswersNum = questions.length - Object.entries(user.answers).length;
    const createdQues = user.questions.length;
    const userName = user.name.split(" ");

    return (
      <BrowserRouter>
        <div className="dashboard">
          <div className="dash-container">
            <div className="side-user">
              <div
                className="user-image"
                style={{
                  width: 200,
                  height: 200,
                  backgroundImage: `url(${user.avatarURL})`,
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="user-infos">
                <p className="user-name">{user.name}</p>
                <div className="infos-list">
                  <div className="links">
                    <NavLink className="link" to="/dashboard/answeredquestions">
                      answered questions
                    </NavLink>
                    <p className="quesNum">{answersNum}</p>
                  </div>
                  <div className="links">
                    <NavLink
                      className="link"
                      to="/dashboard/unansweredquestions"
                    >
                      unanswered questions
                    </NavLink>
                    <p className="quesNum">{unAnswersNum}</p>
                  </div>
                  <div className="links">
                    <NavLink className="link" to="/dashboard/createdquestions">
                      created questions
                    </NavLink>
                    <p className="quesNum">{createdQues}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contents">
              <h3 className="title">Dashboard</h3>

              <hr />

              <NavLink to="/leaderboard">go to leaderboard</NavLink>
              <Switch>
                <Route exact path="/dashboard">
                  <h4 className="infosTitle">personal data :</h4>
                  <p className="infos">
                    <span>first name : </span>
                    {userName[0]}
                  </p>
                  <p className="infos">
                    <span>last name : </span>
                    {userName[1]}
                  </p>
                  <p className="infos">
                    <span>email address : </span>
                    {user.id}@example.com
                  </p>
                </Route>
                <Route exact path="/dashboard/answeredquestions">
                  <Answers
                    answers={user.answers}
                    questions={questions}
                    users={this.props.users}
                  />
                </Route>
                <Route exact path="/dashboard/unansweredquestions">
                  <UnAnswers
                    answers={user.answers}
                    questions={questions}
                    users={this.props.users}
                  />
                </Route>
                <Route exact path="/dashboard/createdquestions">
                  <CreatedQues
                    createdquestions={user.questions}
                    questions={questions}
                    users={this.props.users}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    authedUser: state.AuthedUser,
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(Dashboard);
