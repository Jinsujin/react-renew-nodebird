export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {}
};

/**
 * Action 생성 함수
 */
export const loginAction = data => {
  return {
    type: "LOG_IN",
    data
  };
};

export const logoutAction = () => {
  return {
    type: "LOG_OUT"
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state.user,
        isLoggedIn: true,
        user: action.data
      };
    case "LOG_OUT":
      return {
        ...state.user,
        isLoggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default reducer;
