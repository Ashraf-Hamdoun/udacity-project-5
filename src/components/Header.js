import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// import actions to dispatch them
import * as actions from "../Store/actions";

class Header extends Component {
  // function to handle logging out
  handleLogOut = () => {
    this.props.logOut();
    document.querySelector(".userLinks").style.display = "none";
    console.log("log out");
  };

  render() {
    return (
      <header className="App-header">
        <nav className="App-nav">
          <div className="logo">
            <h1>Would you rather</h1>
          </div>
          <div className="userLinks">
            <ul className="nav-links">
              <li className="links">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="links">
                <NavLink to="/leaderboard">leaderboard</NavLink>
              </li>
              <li className="links">
                <NavLink to="/questions">questions</NavLink>
              </li>
              <li className="links">
                <NavLink to="/createquestion">create question</NavLink>
              </li>
              <li className="links">
                <NavLink to="/login" onClick={this.handleLogOut}>
                  log out
                </NavLink>
              </li>
            </ul>
            <div className="userImg"></div>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => {
      dispatch(actions.LOG_OUT());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
