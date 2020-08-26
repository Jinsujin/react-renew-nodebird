import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

/**
 * HYDRATE : 리덕스 서버 사이드 렌더링을 위함
 */
const initialState = {
  user: {},
  post: {}
};

// 리듀서를 합쳐줌
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE = ", action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post
});

export default rootReducer;
