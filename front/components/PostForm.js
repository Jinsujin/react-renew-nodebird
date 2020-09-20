import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, Button, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST
} from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    // dispatch(addPost(text));

    if (!text || text.trim()) {
      return alert("게시글을 작성하세요");
    }

    const formData = new FormData();
    imagePaths.forEach(p => {
      formData.append("image", p);
    });
    formData.append("content", text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    });
  }, [text, imagePaths]);

  const imageInputEl = useRef(null); // 실제 DOM 에 접근하기 위함

  // 버튼 눌러서 사진 업로드창 띄우기
  const onClickImageUpload = useCallback(() => {
    imageInputEl.current.click(); // error
  }, [imageInputEl.current]);

  const onChangeImages = useCallback(e => {
    console.log("images", e.target.files); // 선택한 이미지에 대한 정보
    const imageFormData = new FormData(); // 멀티파트 형식으로 보내야 하기 때문에 FormData
    // 유사배열이기때문에, forEach 가 없음 => 배열의 forEach 를 사용하기 위해 [].forEach
    [].forEach.call(e.target.files, f => {
      imageFormData.append("image", f); // (key, value)
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    });
  });

  const onRemoveImage = useCallback(index => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    });
  });

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
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInputEl}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드 </Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`http://localhost:3065/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
