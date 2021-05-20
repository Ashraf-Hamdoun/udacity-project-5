import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class GuestGreeting extends Component {
    render() {
        return (
            <div className="GuestGreeting">
                <h2 className="title">Please login first</h2>
                <NavLink to="/login" className="btn btn-primary">login now</NavLink>
            </div>
        )
    }
}

export default GuestGreeting;