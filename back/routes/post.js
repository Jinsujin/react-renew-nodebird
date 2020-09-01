const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const { isLoggedIn } = require("./middlewares");

/**
 * 게시글 생성
 * POST /post
 */
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id // 누가쓴 게시물인지
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 댓글 작성
 * POST /post/1/comment
 */
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    // 주소값으로 전달된 postId 값을 검사
    const post = await Post.findOne({
      where: { id: req.params.postId }
    });
    if (!post) {
      // 존재하지 않을때
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
