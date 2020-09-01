const express = require("express");
const router = express.Router();

const { Post, Image, User, Comment } = require("../models");

/**
 * GET /posts
 */
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"] // 댓글 내림차순 정렬
      ],
      include: [
        {
          model: User,
          attribute: ["id", "nickname"] // User 정보에서는 비밀번호를 반드시 빼야함
        },
        {
          model: Image
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attribute: ["id", "nickname"]
            }
          ]
        }
      ]
    });
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
