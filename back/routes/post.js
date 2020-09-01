const express = require("express");
const router = express.Router();
const { Post, Image, Comment, User } = require("../models");
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
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"]
            }
          ]
        },
        {
          model: User, // 게시글  작성자
          attributes: ["id", "nickname"]
        },
        {
          model: User, // 좋아요 누른 사람
          as: "Likers",
          attributes: ["id"]
        }
      ]
    });
    res.status(201).json(fullPost);
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
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 좋아요
 * PATCH /post/1/like
 */
router.patch("/:postId/like", async (req, res, next) => {
  //1. 게시글이 있는지 검사
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    //addLikers - 시퀄라이즈에서 알아서 sql 을 만들어 준다
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * DELETE /post/1/like
 */
router.delete("/:postId/like", async (req, res, next) => {
  //1. 게시글이 있는지 검사
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
