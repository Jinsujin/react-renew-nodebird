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
  Hashtag.associate = db => {};
  return Hashtag;
};
