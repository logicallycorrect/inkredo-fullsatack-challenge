import Type from "./types";

// create Company
export function createCompany(data, cb) {
  return dispatch => {
    fetch(Type.URL + "/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch({
            type: Type.ADD_COMPANY
          });
          cb(true);
        }
      });
  };
}

// get single company
export function getSingleCompany(companyId, cb) {
  return dispatch => {
    fetch(Type.URL + "/companies/" + companyId)
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch({
            type: Type.GET_SINGLE_COMPANY,
            company: data.company
          });
          cb(true);
        }
      });
  };
}

// get all companies
export function getAllCompany(cb) {
  return dispatch => {
    fetch(Type.URL + "/companies")
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch({
            type: Type.GET_ALL_COMPANIES,
            allCompanies: data.company
          });
          cb(true);
        }
      });
  };
}
