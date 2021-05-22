import React, { Component } from "react";
import { Link } from "react-router-dom";

class Page404 extends Component {
  render() {
    return (
      <div className="Page_404">
        <div className="error-template">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div className="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                  <Link to="/" className="btn btn-primary btn-lg">
                    <span className="glyphicon glyphicon-home"></span>
                    Take Me Home{" "}
                  </Link>
                </div>
              </div>
      </div>
    );
  }
}

export default Page404;
