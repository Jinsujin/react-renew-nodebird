import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const imageInputEl = useRef(null); // 실제 DOM 에 접근하기 위함
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    console.log("submit--");
    dispatch(addPost(text));
  }, [text]);

  // 버튼 눌러서 사진 업로드창 띄우기
  const onClickImageUpload = useCallback(() => {
    // imageInputEl.current.click(); // error
  }, [imageInputEl.current]);

  return (
    <Form
      onFinish={onSubmit}
      encType="multipart/form-data"
      style={{ margin: "10px 0 20px" }}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="입력해주세요"
      />
      <div>
        <Input type="file" multiple hidden ref={imageInputEl} />
        <Button onClick={onClickImageUpload}>이미지 업로드 </Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
