import { combineReducers } from "redux";

import employee from "./employee";
import company from "./company";
import companyHistory from "./companyHistory";

export default combineReducers({
  employee,
  company,
  companyHistory
});
