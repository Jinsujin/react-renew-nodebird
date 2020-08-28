import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
    state => state.post
  );

  // 컴포넌트 마운트시, 10개 불러와 초기값으로 넣어줌
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []);

  // 스크롤 내렸을때 posts 불러오기
  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    // useEffect에서 window addEvent할때, 꼭 return 해야 함
    // 뒷정리 함수. 메모리에 쌓이지 않게 정리해야 함
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
