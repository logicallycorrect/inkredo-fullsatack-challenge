import Type from "../actions/types";

export default (state = { company: {}, companies: [] }, action) => {
  switch (action.type) {
    case Type.ADD_COMPANY:
      return {
        ...state
      };
    case Type.GET_SINGLE_COMPANY:
      return {
        ...state,
        company: action.company
      };
    case Type.GET_ALL_COMPANIES:
      return {
        ...state,
        companies: action.allCompanies
      };

    default:
      return state;
  }
};
