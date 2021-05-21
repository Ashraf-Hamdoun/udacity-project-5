import * as _DATA from "../../data/_DATA";

// the initial state
const initialState = {
  users: {},
  questions: {},
  AuthedUser: "",
  isLoggedIn: false,
};

// data from api
const getData = () => {
  // componentDidMount
  // get users
  _DATA._getUsers().then((users) => {
    initialState.users = users;
    console.log("Data users :: ", users);
  });
  // get questions
  _DATA._getQuestions().then((questions) => {
    initialState.questions = questions;
    console.log("Data questions :: ", questions);
  });
};
getData();

// the reducer for the store
export const rootRducer = (state = initialState, action) => {
  switch (action.type) {
    // function when we select user
    case "SELECT_USER":
      if (action.payload !== "") {
        initialState.AuthedUser = action.payload;
        initialState.isLoggedIn = true;
        setTimeout(() => {
          document.querySelector(".userLinks").style.display = "flex";
          document.querySelector(".userLinks").style.justifyContent =
            "space-between";

          // select user to catch its avatar url
          const user = Object.entries(initialState.users)
            .map((user) => {
              return user[1];
            })
            .filter((user) => user.id === initialState.AuthedUser)[0];

          document.querySelector(
            ".userLinks .userImg"
          ).style.backgroundImage = `url(${user.avatarURL})`;
        }, 2000);
        console.log("AuthedUser is ::  ", action.payload);
        return state;
      } else {
        // warnimg to select user
        alert("Please select a user !");
        return state;
      }

    // function to create a new question
    case "CREATE_QUESTION":
      _DATA._saveQuestion(action.payload);
      // set users after creation question
      _DATA._getUsers().then((users) => {
        initialState.users = users;
        console.log("Data users :: ", users);
      });
      // set questions after creation question
      _DATA._getQuestions().then((questions) => {
        initialState.questions = questions;
        console.log("Data questions :: ", questions);
      });
      // tell the user about completing the mation
      alert("Question was successfully created !");
      console.log(action.payload);
      setTimeout(() => {
        document.querySelector(".home a").style.display = "none";
      }, 500);
      return state;
      // eslint-disable-next-line
      break;

    // function to save the question's answer
    case "SAVE_QUESTION_ANSWER":
      _DATA._saveQuestionAnswer(action.payload);
      // set users after saving answer
      _DATA._getUsers().then((users) => {
        initialState.users = users;
        console.log("Data users :: ", users);
      });
      // set questions after saving answer
      _DATA._getQuestions().then((questions) => {
        initialState.questions = questions;
        console.log("Data questions :: ", questions);
      });
      // tell user about completing save
      alert("Question was successfully answered !");
      console.log(action.payload);

      return state;
      // eslint-disable-next-line
      break;

    // function to log out
    case "LOG_OUT":
      if (action.payload === "logging out") {
        initialState.AuthedUser = "";
        initialState.isLoggedIn = false;
      }

      console.log("you were logged out");

      return state;
      // eslint-disable-next-line
      break;

    default:
      return state;
  }
};
