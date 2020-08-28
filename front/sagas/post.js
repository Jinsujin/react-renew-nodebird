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
import shortId from "shortid";

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

/************** AddPost ****************/
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);

    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      //   data: result.data // 성공 결과
      data: {
        id,
        content: action.data
      }
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
/*************** // End AddPost  ***************/

/************** removePost ****************/
function removePostAPI(data) {
  return axios.post("/api/post", data);
}

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);

    yield put({
      type: REMOVE_POST_SUCCESS,
      //   data: result.data // 성공 결과
      data: action.data // post id
    });
    yield put({
      type: REMOVE_POST_OF_ME, // user 리듀서
      data: action.data
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}
/*************** // End RemovePost  ***************/

/************** AddComment ****************/
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      //   data: result.data // 성공 결과
      data: action.data
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
  yield all([fork(watchAddPost), fork(watchRemovePost), fork(watchAddComment)]);
}
