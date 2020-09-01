import {
  all,
  delay,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
  throttle
} from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
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
  return axios.post("/post", { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data // 생성된 게시글
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
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
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
/*************** // End RemovePost  ***************/

/************** AddComment ****************/
// data: { content: commentText, postId: post.id, userId: id }
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: e.response.data // 실패 결과
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
/*************** // End AddComment  ***************/

/************** loadPost ****************/
function loadPostAPI(data) {
  return axios.get("/posts", data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.data);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data // 성공 결과
    });
  } catch (e) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: e.response.data // 실패 결과
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
/*************** // End loadPost  ***************/

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts)
  ]);
}
