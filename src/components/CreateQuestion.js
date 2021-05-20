import React, { Component } from "react";
import { connect } from "react-redux";

// import all actions to dispatch them
import * as actions from "../Store/actions";

class CreateQuestion extends Component {
  // save data to reuse it
  state = {
    optionOneText: "",
    optionTwoText: "",
    moveAfterChoose: "#",
  };

  // handle change of inputs
  handleOptionOne = (e) => {
    this.setState({
      optionOneText: e.target.value,
    });
  };

  handleOptionTwo = (e) => {
    this.setState({
      optionTwoText: e.target.value,
    });
  };

  // handle function of creating question
  handleCreateQuestion = () => {
    // if condition to fill all data first
    if (this.state.optionOneText !== "" && this.state.optionTwoText !== "") {
      // send data on object to reducer
      this.props.createQuestion({
        optionOneText: this.state.optionOneText,
        optionTwoText: this.state.optionTwoText,
        author: this.props.authedUser,
      });

      // set data to prevent double click
      this.setState({
        optionOneText: "",
        optionTwoText: "",
      });

      // empty inputs after creation
      document.getElementById("txtOfOptionOne").value = "";
      document.getElementById("txtOfOptionTwo").value = "";

      console.log("question data send");
    } else {
      alert("You must fill all the required fields");
    }
  };

  render() {
    return (
      <div className="createQuestion">
        <h4 className="title">Creating a new Question</h4>
        <form>
          <div className="form-group">
            <label htmlFor="txtOfOptionOne">Option One</label>
            <input
              type="text"
              className="form-control"
              id="txtOfOptionOne"
              placeholder="Enter here the first option"
              onKeyUp={this.handleOptionOne}
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtOfOptionTwo">Option Two</label>
            <input
              type="text"
              className="form-control"
              id="txtOfOptionTwo"
              placeholder="Enter here the second option"
              onKeyUp={this.handleOptionTwo}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleCreateQuestion}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.AuthedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuestion: (question) => {
      dispatch(actions.CREATE_QUESTION(question));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
