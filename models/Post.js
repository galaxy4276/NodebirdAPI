module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true, // 데이터 삭제하지않고 삭제된 날짜만 추가하고 삭제된 효과를 줌, 날짜가 추가되면 find에서 제외됨
  });
};