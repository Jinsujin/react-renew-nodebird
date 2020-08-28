import shortId from "shortid";
import produce from "immer";
import faker from "faker";

/**
 * User, Images, Comments 대문자인 이유
 * 시퀄라이즈에서 어떤정보와 다른정보가 관계가 있으면 합쳐줌 -> 이때 대문자가 되어서 나옴
 */
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "jinsu"
      },
      content: "첫번째 게시글 #해시 #리액트",
      Images: [
        {
          id: shortId.generate(),
          src:
            "https://image.laftel.net/items/thumbs/large/f838ac8f-39c8-4f09-be41-3d3331717d92.jpg"
        },
        {
          id: shortId.generate(),
          src:
            "https://image.laftel.net/items/thumbs/large/3f2aaebd-eda4-4b84-a764-f940dfca1413.jpg"
        },
        {
          id: shortId.generate(),
          src:
            "https://image.laftel.net/items/thumbs/large/5f177f77-79c2-43d6-ae35-d63bb44ea81e.jpg"
        }
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            nickname: "nero"
          },
          content: "코멘트 내용입니다"
        },
        {
          id: shortId.generate(),
          User: {
            nickname: "hero"
          },
          content: "222"
        }
      ]
    }
  ],
  // 이미지 경로들
  imagePaths: [],
  // 게시글 추가가 완료되었을때 true

  addPostLoading: false, // post 등록중인지
  addPostDone: false,
  addPostError: null,

  removePostLoading: false, // post 삭제중인지
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.imageUrl()
        }
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
          },
          content: faker.lorem.sentence()
        }
      ]
    }))
);

/**
 * 액션 생성 함수
 */
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data
});

const dummyPost = data => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: "jinsu"
  },
  Images: [],
  Comments: []
});

const dummyComment = data => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "jinsu"
  }
});

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        // 전달받은 data: { content: commentText, postId: post.id, userId: id }
        // 1. 게시글 찾기
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        // 2. 게시글의 커멘트배열에 새로운 커맨트 하나 추가
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
