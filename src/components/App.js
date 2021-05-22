/** Routers */
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import { connect } from "react-redux";

// importing of our components
import Header from "./Header";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import CreateQuestion from "./CreateQuestion";
import Questions from "./Questions";
import Question from "./Question";
import Login from "./Login";
import LoginLink from "./LoginLink";
import Page404 from "./Page_404";

// connect our styles to the app
import "../styles/App.scss";

function App(props) {
  console.log("authedUser is :: ", props.authedUser);
  console.log("IsLoggedIn :: ", props.isLoggedIn);

  return (
    // to insert the routes use BrowserRouter
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          {/* use Switch to switch between our routes */}
          <Switch>
            {/* Home page */}
            <Route exact path="/">
              <div className="home">
                <h2>Would you rather ?</h2>
                <LoginLink />
              </div>
            </Route>
            {/* leaderboard page */}
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
            {/* dashboard page */}
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            {/* questions page*/}
            <Route exact path="/questions">
              <Questions />
            </Route>
            {/* answer question page */}
            <Route exact path="/questions/:id">
              <Question />
            </Route>
            {/* create question page */}
            <Route exact path="/createquestion">
              <CreateQuestion />
            </Route>
            {/* login page*/}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    authedUser: state.AuthedUser,
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
