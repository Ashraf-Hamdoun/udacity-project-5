import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../Store/actions";

class Login extends Component {
  state = {
    AuthedUser: "",
    moveAfterChoose: "#",
  };

  onChangeUser(User) {
    this.setState({
      AuthedUser: User,
      moveAfterChoose: this.props.dir,
    });
  }

  render() {
    const Users = Object.entries(this.props.users).map((User) => {
      return {
        user: User[0],
        infos: User[1],
      };
    });

    const showUsers = Users.map((User) => {
      return (
        <option key={User.infos.id} value={User.user}>
          {User.infos.name}
        </option>
      );
    });

    return (
      <div className="Log-in-container">
        <h3>Would you rather</h3>
        <h5>select one to login</h5>

        {/* Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option> */}
        <select
          className="form-select"
          onChange={(event) => this.onChangeUser(event.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one user ...
          </option>
          {showUsers}
        </select>
        <Link
          id="moveAfterLogin"
          className="btn btn-danger"
          onClick={(e) => this.props.selectUser(this.state.AuthedUser)}
          to={this.state.moveAfterChoose}
        >
          log in
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    dir: state.dir,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectUser: (AuthedUser) => {
      dispatch(actions.SELECT_USER(AuthedUser));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
