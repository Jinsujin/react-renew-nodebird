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
  Post.associate = db => {
    db.Post.belongsTo(db.User); // post 작성자
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // 리트윗
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // post 에 좋아요를 누른 사람들
  };
  return Post;
};
