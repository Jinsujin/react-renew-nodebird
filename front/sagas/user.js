import { all, delay, fork, put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
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
  UNFOLLOW_FAILURE,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE
} from "../reducers/user";

/************** loadUser ****************/
function loadUserAPI() {
  return axios.get("/user");
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}
/*************** // End loadUser  ***************/

/************** Login ****************/
/**
 * STEP03.
 * 서버에 요청
 * 주의- 제너레이터가 아님!
 */
function logInAPI(data) {
  return axios.post("/user/login", data);
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
    // yield delay(1000);
    const result = yield call(logInAPI, action.data);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data // 성공 결과
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
  return axios.get("/user/logout");
}

function* logOut() {
  try {
    const result = yield call(logOutAPI);

    yield put({
      type: LOG_OUT_SUCCESS
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
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);

    yield put({
      type: SIGN_UP_SUCCESS
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
// data: userid
function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);

    yield put({
      type: FOLLOW_SUCCESS,
      // data: result.data // 성공 결과
      data: result.data // 사용자 아이디
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
function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data // 성공 결과
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
/************** changeNickname ****************/
function changeNicknameAPI() {
  return axios.patch("/user/nickname", { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);

    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
/*************** // End changeNickname  ***************/
/************** loadFollwers ****************/
function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);

    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
/*************** // End loadFollwers  ***************/
/************** loadFollwings ****************/
function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);

    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
/*************** // End loadFollwings  ***************/
/************** removeFollower ****************/
function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);

    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
/*************** // End removeFollower  ***************/
export default function* userSaga() {
  yield all([
    fork(watchRemoveFollower),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchLoadUser),
    fork(watchChangeNickname),
    fork(watchLogIN),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow)
  ]);
}
