import Type from "../actions/types";

export default (state = { isLogged: false, employee: {} }, action) => {
  switch (action.type) {
    case Type.REGISTER:
      return {
        ...state
      };

    case Type.LOGIN:
      return {
        ...state,
        isLogged: action.success
      };

    case Type.LOGOUT:
      return {
        ...state,
        isLogged: false,
        employee: {}
      };

    case Type.GET_PROFILE:
      return {
        ...state,
        employee: action.employee
      };

    default:
      return state;
  }
};
