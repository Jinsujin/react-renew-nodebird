import shortId from "shortid";

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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      };

    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter(v => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      };
    case ADD_COMMENT_SUCCESS:
      // data: { content: commentText, postId: post.id, userId: id }
      const postIndex = state.mainPosts.findIndex(
        v => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      };
    default:
      return state;
  }
};

export default reducer;
