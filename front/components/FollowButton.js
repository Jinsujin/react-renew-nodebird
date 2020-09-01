import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    state => state.user
  );

  // 팔로잉여부:  나의 팔로잉한 사람들 목록중, 게시글 작성자 아이디가 포스트쓴 사람의 아이디와 같을때
  const isFollowing = me?.Followings.find(v => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    // 팔로잉인데, 버튼을 누른경우
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id
      });
    }
  }, [isFollowing]);

  // 게시글 작성자의 아이디와 내 아이디가 같으면, 팔로우 버튼을 보이지 않음
  if (post.User.id === me.id) {
    return null;
  }

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired
};

export default FollowButton;
