module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      // utf8mb4: 한글+ 이모티콘 사용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci" // 한글 저장
    }
  );
  Post.associate = db => {};
  return Post;
};
