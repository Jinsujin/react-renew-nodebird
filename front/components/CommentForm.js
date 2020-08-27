import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

/**
 * post.id 에 댓글을 달아야 하기때문에 post 를 prop으로 가져옴
 */

const CommentForm = ({ post }) => {
  const id = useSelector(state => state.user.me?.id);
  const { addCommentDone } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitContent = useCallback(() => {
    console.log(post.id, commentText);

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId, id }
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitContent}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired
};

export default CommentForm;
