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

import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
