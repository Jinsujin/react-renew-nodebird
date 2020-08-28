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

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
