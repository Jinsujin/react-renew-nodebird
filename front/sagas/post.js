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

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "../reducers/post";

/************** AddPost ****************/
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      data: e.response.data // 실패 결과
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
/*************** // End AddPost  ***************/

/************** AddComment ****************/
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS
      //   data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: e.response.data // 실패 결과
    });
  }
}

function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}
/*************** // End AddComment  ***************/

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
