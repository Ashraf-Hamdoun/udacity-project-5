import React, { Component } from "react";

class CreatedQues extends Component {
  render() {
    const createdquestions = this.props.createdquestions;
    const questions = this.props.questions;

    // filter questions by created ones
    // eslint-disable-next-line
    const filterQues = questions.filter((e) => {
      for (let i = 0; i < createdquestions.length; i++) {
        const element = createdquestions[i];
        if (e.id === element) {
          return e.id === element;
        }
      }
    });

    // use this to catch avatar and name of question's author
    const users = Object.entries(this.props.users).map((user) => {
      return { id: user[1].id, name: user[1].name, avatar: user[1].avatarURL };
    });

    // to map our filtered questions
    const showAnswers = filterQues.map((answer) => {
      const author = users.filter((user) => {
        return user.id === answer.author;
      })[0];

      return (
        <div key={answer.id} className="answer">
          <div
            className="authorImg"
            style={{
              backgroundImage: `url(${author.avatar})`,
            }}
          ></div>
          <p className="quesAuthor">
            Author : <span>{author.name}</span>
          </p>
          <div className="options">
            <div className="optionOne">
              <p className="optionOneTxt">
                <span>- Option one :</span> {answer.optionOne.text}
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
                    (answer.optionOne.votes.length / 3) * 100
                  )}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: `${Math.floor(
                      (answer.optionOne.votes.length / 3) * 100
                    )}%`,
                  }}
                >
                  {Math.floor((answer.optionOne.votes.length / 3) * 100)}% votes
                </div>
              </div>
            </div>
            <div className="optionTwo">
              <p className="optionTwoTxt">
                <span>- Option two :</span> {answer.optionTwo.text}
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
                    (answer.optionTwo.votes.length / 3) * 100
                  )}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    width: `${Math.floor(
                      (answer.optionTwo.votes.length / 3) * 100
                    )}%`,
                  }}
                >
                  {Math.floor((answer.optionTwo.votes.length / 3) * 100)}% votes
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="answers">
        <h4 className="subTitle">Created questions :</h4>
        {showAnswers}
      </div>
    );
  }
}

export default CreatedQues;
