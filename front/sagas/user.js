import {
  all,
  delay,
  fork,
  put,
  call,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE
} from "../reducers/user";

/************** Login ****************/
/**
 * STEP03.
 * 서버에 요청
 * 주의- 제너레이터가 아님!
 */
function logInAPI(data) {
  return axios.post("/api/login", data);
}

/**
 * STEP02.
 * 서버 요청이 실패할수 있으므로 try catch 로 감싸줌
 * action: 액션의 매개변수로 데이터를 받아올 수 있다
 * action.type : LOG_IN_REQUEST
 * action.data : login data
 */
function* logIn(action) {
  try {
    console.log("saga - logIn start");
    // 실제 서버를 대신해서 테스트
    yield delay(1000);
    // logInAPI을 통해 서버에서 요청받은 결과값을 받아올때까지 기다림(call)
    // const result = yield call(logInAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data // 성공 결과
      data: action.data // 더미 데이터 테스트
    });
  } catch (e) {
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

/**
 * STEP01.
 * LOG_IN 액션이 실행될때까지 대기
 * 액션이 들어오면, logIn 제너레이터 함수 실행
 * while 로 감싸줘야, 계속해서 액션을 받아 처리할 수 있다
 */
function* watchLogIN() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

/*************** // End Login  ***************/

/************** Logout ****************/
function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    yield delay(1000);
    // logInAPI을 통해 서버에서 요청받은 결과값을 받아올때까지 기다림(call)
    // const result = yield call(logOutAPI);

    yield put({
      type: LOG_OUT_SUCCESS
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
/*************** // End LogOut  ***************/

/************** SignUp ****************/
// data: {email, password, nickname}
function signUpAPI(data) {
  return axios.post("http://localhost:3065/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);

    yield put({
      type: SIGN_UP_SUCCESS
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
/*************** // End signUp  ***************/

/************** follow ****************/
function followAPI() {
  return axios.post("/api/follow");
}

function* follow(action) {
  try {
    yield delay(1000);
    // logInAPI을 통해 서버에서 요청받은 결과값을 받아올때까지 기다림(call)
    // const result = yield call(followAPI);

    yield put({
      type: FOLLOW_SUCCESS,
      // data: result.data // 성공 결과
      data: action.data // 사용자 아이디
    });
  } catch (e) {
    yield put({
      type: FOLLOW_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
/*************** // End follow  ***************/
/************** unfollow ****************/
function unfollowAPI() {
  return axios.post("/api/unfollow");
}

function* unfollow(action) {
  try {
    yield delay(1000);
    // const result = yield call(unfollowAPI);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data // 사용자 아이디
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
/*************** // End follow  ***************/

export default function* userSaga() {
  yield all([
    fork(watchLogIN),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow)
  ]);
}
