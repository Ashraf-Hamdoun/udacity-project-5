// Actions
export const CREATE_QUESTION = (question) => {
  const action = {
    type: "CREATE_QUESTION",
    payload: question,
  };

  return action;
};

export const SAVE_QUESTION_ANSWER = (answer) => {
  const action = {
    type: "SAVE_QUESTION_ANSWER",
    payload: answer,
  };

  return action;
};

export const SELECT_USER = (AuthedUser) => {
  const action = {
    type: "SELECT_USER",
    payload: AuthedUser,
  };

  return action;
};

export const LOG_OUT = () => {
  const action = {
    type: "LOG_OUT",
    payload: "logging out",
  };

  return action;
};

export const SET_DIR = (dir) => {
  const action = {
    type: "SET_DIR",
    payload: dir,
  };

  return action;
};