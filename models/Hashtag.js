module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Hashtag', {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    }
  }, {
    timestamps: true,
    paranoid: true,
  });
};