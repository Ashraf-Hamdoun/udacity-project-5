import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const users = Object.entries(this.props.users).map((user) => {
      return user[1];
    });

    const questions = Object.entries(this.props.questions).length;

    const showUsers = users.map((user) => {
      const answers = Object.entries(user.answers).length;
      const created = user.questions.length;

      return (
        <div key={user.id} className="user">
          <div
            className="userImg"
            style={{
              height: 200,
              width: 200,
              backgroundImage: `url(${user.avatarURL})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="rates">
            <p className="username">{user.name}</p>
            <div className="questions">
              <div className="sorts">
                <p className="title">Answered questions</p>
                <div
                  className="progress"
                  style={{
                    background: "#aaa",
                  }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={Math.floor((answers / questions) * 100)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${Math.floor((answers / questions) * 100)}%`,
                    }}
                  >
                    {Math.floor((answers / questions) * 100)}% votes
                  </div>
                </div>
              </div>
              <div className="sorts">
                <p className="title">Unanswered questions</p>
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
                      ((questions - answers) / questions) * 100
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${Math.floor(
                        ((questions - answers) / questions) * 100
                      )}%`,
                    }}
                  >
                    {Math.floor(((questions - answers) / questions) * 100)}%
                    votes
                  </div>
                </div>
              </div>
              <div className="sorts">
                <p className="title">Created questions</p>
                <div
                  className="progress"
                  style={{
                    background: "#aaa",
                  }}
                >
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuenow={Math.floor((created / questions) * 100)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                      width: `${Math.floor((created / questions) * 100)}%`,
                    }}
                  >
                    {Math.floor((created / questions) * 100)}% votes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="leaderboard">
        this is a leaderboardmmm
        {showUsers}
      </div>
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

export default connect(mapStateToProps)(Leaderboard);