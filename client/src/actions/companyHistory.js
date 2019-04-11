import Type from "./types";

// join company
export function joinCompany(companyId, cb) {
  return dispatch => {
    fetch(Type.URL + "/companies" + companyId + "/join")
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch({
            type: Type.JOIN_COMPANY
          });
          cb(true);
        }
      });
  };
}

// leave Company
export function leaveCompany(companyId, cb) {
  return dispatch => {
    fetch(Type.URL + "/companies" + companyId + "/leave")
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch({
            type: Type.LEAVE_COMPANY
          });
          cb(true);
        }
      });
  };
}
