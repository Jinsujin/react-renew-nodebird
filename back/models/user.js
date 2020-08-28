module.exports = (sequelize, DataTypes) => {
  // 'User' -> MySql 에서는 'users' 테이블 생성
  // id 는 1,2,3,4... 로 기본값으로 들어있음. 따로 작성할 필요없다
  const User = sequelize.define(
    "User",
    {
      // Column: 세로.
      // Row: 실제 데이터들. 가로
      // 각 컬럼에 대한 이름, 데이터 타입 설정
      // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
      email: {
        type: DataTypes.STRING(30),
        allowNill: false, // 필수값
        unique: true // 고유값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNill: false // 필수값
      },
      password: {
        type: DataTypes.STRING(100),
        allowNill: false // 필수값
      }
    },
    {
      // MySql 에는 한글을 사용하지 못하므로(에러남) 설정 필요
      charset: "utf8",
      collate: "utf8_general_ci" // 한글 저장
    }
  );
  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 좋아요

    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId"
    });
  };
  return User;
};
