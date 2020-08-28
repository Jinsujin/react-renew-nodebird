module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
      // utf8mb4: 한글+ 이모티콘 사용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Hashtag.associate = db => {
    // 게시물은 여러개의 해시태그를 가짐
    // 해시태그를 눌렀을때, 해시태그에 속한 게시물 List 가 뜸
    // => 해시태그도 게시물을 여러개를 가짐 (다:다)
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
