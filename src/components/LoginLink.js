import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

function LoginLink(props) {
  if (props.isLoggedIn) {
    return <p>you are welcome ...</p>;
  }
  return (
    <NavLink to="/login" className="btn btn-primary">
      Start Now
    </NavLink>
  );
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LoginLink);
