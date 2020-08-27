import {
  all,
  delay,
  fork,
  call,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import axios from "axios";

/*
    [effects]

- take: 액션을 한번 받아 처리
- takeEvery: 액션 여러번 처리. 마치 while(true) 처럼 동작
- takeLatest: 액션을 2번클릭했을때, 기존에 진행중이던 작업이(Back 응답->Front) 있으면 취소하고 마지막 한번만 실행. 
    주의) 백엔드에는 2번 요청이 그대로 보내진다.
    throttle(액션, 2000) // 2초동안 API 한번만 실행
- takeLeading : 액션을 2번클릭했을때, 맨앞 한번만 실행
- all: 여러가지 사가를 합침
- fork: 제너레이터 함수를 실행. 비동기 함수 호출. - loginAPI 요청 보내고, 결과를 받는거와 상관없이 바로 다음줄 코드 실행
    axios.post('/api/login')

- call: 제너레이터 함수를 실행. 동기 함수 호출 - loginAPI 가 값을 return 할때까지 기다림
    axios.post('/api/login')
    .then(() => {
        yield put({
            type: "LOG_IN_SUCCESS",
            data: result.data // 성공 결과
          });
    })

*/

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
    // 실제 서버를 대신해서 테스트
    yield delay(1000);
    // logInAPI을 통해 서버에서 요청받은 결과값을 받아올때까지 기다림(call)
    // const result = yield call(logInAPI, action.data);

    yield put({
      type: "LOG_IN_SUCCESS"
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: "LOG_IN_SUCCESS",
      data: e.response.data // 실패 결과
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
  yield takeEvery("LOG_IN_REQUEST", logIn);
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
      type: "LOG_OUT_SUCCESS",
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: e.response.data // 실패 결과
    });
  }
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}
/*************** // End LogOut  ***************/

/************** AddPost ****************/
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS"
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: "ADD_POST_SUCCESS",
      data: e.response.data // 실패 결과
    });
  }
}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPost);
}
/*************** // End AddPost  ***************/

export default function* rootSaga() {
  yield all([fork(watchLogIN), fork(watchLogOut), fork(watchAddPost)]);
}
