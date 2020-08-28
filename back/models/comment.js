module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      // utf8mb4: 한글+ 이모티콘 사용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Comment.associate = db => {};
  return Comment;
};