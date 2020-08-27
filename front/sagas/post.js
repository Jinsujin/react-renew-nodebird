import {
  all,
  delay,
  fork,
  call,
  put,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import axios from "axios";

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

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
