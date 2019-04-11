import Type from "./types";
// const URL = "http://localhost:8000/api/v1";

//  Register submit
export function registerSubmit(state, cb) {
  return dispatch => {
    fetch(Type.URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Type.REGISTER
        });
        if (data.success) {
          cb(true);
        } else {
          cb(false, data.message);
        }
      });
  };
}

// Login submit
export function loginSubmit(state, cb) {
  return dispatch => {
    fetch(Type.URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Type.LOGIN,
          success: data.success
        });
        if (data.success) {
          cb(true);
        } else {
          cb(false, data.message);
        }
      });
  };
}

// Logout
export function handleLogout() {
  return dispatch => {
    fetch(Type.URL + "/loggedOut")
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Type.LOGOUT
        });
      });
  };
}

// Get user details
export function getProfile(cb) {
  return dispatch => {
    fetch(Type.URL + "/profile")
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: Type.GET_USER,
          employee: data.employee
        });
        cb(true);
      });
  };
}
