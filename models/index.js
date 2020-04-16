const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Seqeulize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.Hashtag = require('./Hashtag')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'Follower',
});
db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'Follow',
});

console.log(db);

module.exports = db;

