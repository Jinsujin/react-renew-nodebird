const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development"; // development(배포용). 개발할때는 production 으로 바뀜
const config = require("../config/config")[env]; // env 값에 따른 설정값을 가져옴
const db = {};

// 시퀄라이즈가 node - mysql 을 연결해줌
// 연결 성공시, sequelize 에 정보가 담김
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// model 을 시퀄라이즈애 등록
db.Comment = require("./comment")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

// table 간의 관계 연결
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
