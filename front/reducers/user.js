export const initialState = {
  isLoggingIn: false, // 로그인 시도중 - true 일때 로딩
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도중 - true 일때 로딩
  me: null,

  signUpData: {},
  loginData: {}
};

/**
 * Action 생성 함수
 */
export const loginRequestAction = data => {
  return {
    type: "LOG_IN_REQUEST",
    data
  };
};

// success, fauilure 는 사가에서 호출해(put) 만들어 넣기때문에 필요 없다
// export const loginSuccessAction = data => {
//   return {
//     type: "LOG_IN_SUCESS",
//     data
//   };
// };

// export const loginFailureAction = data => {
//   return {
//     type: "LOG_IN_FAILURE",
//     data
//   };
// };

export const logoutRequestAction = () => {
  return {
    type: "LOG_OUT_REQUEST"
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer - login");
      return {
        ...state,
        isLoggingIn: true
      };

    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "jinsu" }
      };
    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false
      };
    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLoggingOut: true
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null
      };

    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLoggingOut: false
      };

    default:
      return state;
  }
};

export default reducer;
