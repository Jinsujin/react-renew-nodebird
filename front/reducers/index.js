const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
  },
  post: {
    mainPosts: []
  }
};

/**
 * Action 생성 함수
 */
const login = data => {
  return {
    type: "LOG_IN",
    data
  };
};

const changeNickname = data => {
  type: "CHANGE_NICKNAME", data;
};

changeNickname();

// 동적으로 액션을 생성해주는 함수

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data
        }
      };
  }
};

export default rootReducer;
