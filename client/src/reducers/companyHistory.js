import Type from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case Type.JOIN_COMPANY:
      return {
        ...state
      };
    case Type.LEAVE_COMPANY:
      return {
        ...state
      };

    default:
      return state;
  }
};
