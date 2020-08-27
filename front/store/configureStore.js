/**
 *
 */
import { createWrapper } from "next-redux-wrapper";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares)) // 배포용.
      : composeWithDevTools(applyMiddleware(...middlewares)); // 개발용. devtool 연결 - history 가 쌓이면 자원을 잡아먹기때문
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development"
});

export default wrapper;
