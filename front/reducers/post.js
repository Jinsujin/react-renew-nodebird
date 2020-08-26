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
          src:
            "https://image.laftel.net/items/thumbs/large/3f2aaebd-eda4-4b84-a764-f940dfca1413.jpg"
        },
        {
          src:
            "https://image.laftel.net/items/thumbs/large/3f2aaebd-eda4-4b84-a764-f940dfca1413.jpg"
        },
        {
          src:
            "https://image.laftel.net/items/thumbs/large/3f2aaebd-eda4-4b84-a764-f940dfca1413.jpg"
        }
      ],
      Comments: [
        {
          User: {
            nickname: "nero"
          },
          content: "코멘트 내용입니다"
        },
        {
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
  postAdded: false
};

/**
 * 액션 생성 함수
 */
const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST
};

const dummyPost = {
  id: 2,
  content: "더미데이터",
  User: {
    id: 1,
    nickname: "jinsu"
  },
  Images: [],
  Comments: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      };

    default:
      return state;
  }
};

export default reducer;
