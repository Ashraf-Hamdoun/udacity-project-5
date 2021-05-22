import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../Store/actions";

class GuestGreeting extends Component {
    
    handleLogin = () => {
        this.props.setDir(this.props.dir)
    }

    render() {
        
        return (
            <div className="GuestGreeting">
                <h2 className="title">Please login first</h2>
                <NavLink to='/login' onClick={this.handleLogin} className="btn btn-primary">login now</NavLink>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setDir: (dir) => {
          dispatch(actions.SET_DIR(dir));
        },
      };
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestGreeting);