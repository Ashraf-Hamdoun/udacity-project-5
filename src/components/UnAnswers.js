import React, { Component } from "react";

class UnAnswers extends Component {
  render() {
    const answers = Object.entries(this.props.answers).map((answer) => {
      return answer[0];
    });
    const questionsToCheck = Object.entries(this.props.questions).map(
      (question) => {
        return question[1].id;
      }
    );

    const questions = this.props.questions;

    // how to catch compare between two arrays
    var i = 0;
    var hist = {};
    var restOfQuestions = [];

    buildhist(questionsToCheck);
    buildhist(answers);

    for (i in hist) {
      if (hist[i] === 1) {
        restOfQuestions.push(i);
      }
    }

    // to compare the arrays
    function buildhist(arr) {
      var i;
      for (i = arr.length - 1; i >= 0; i--) {
        if (hist[arr[i]] === undefined) {
          hist[arr[i]] = 0;
        }
        hist[arr[i]]++;
      }
    }

    // eslint-disable-next-line
    const filterQues = questions.filter((e) => {
      for (let i = 0; i < restOfQuestions.length; i++) {
        const element = restOfQuestions[i];
        if (e.id === element) {
          return e.id === element;
        }
      }
    });

    const users = Object.entries(this.props.users).map((user) => {
      return { id: user[1].id, name: user[1].name, avatar: user[1].avatarURL };
    });

    // arranged from the most recently created (top) to the least recently created (bottom)
    filterQues.sort((a, b) => {
      return b.timestamp - a.timestamp;
    })
    
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
        <h4 className="subTitle">Unanswered questions :</h4>
        {showAnswers}
      </div>
    );
  }
}

export default UnAnswers;
