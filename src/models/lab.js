module.exports = (sequelize, DataTypes) => {
  const lab = sequelize.define(
    'lab',
    {
      labId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      Hct: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Hb: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BUN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      EGfR: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: false,
      paranoid: true,
    }
  );
  lab.associate = (models) => {
    lab.belongsTo(models.patient, {
      foreignKey: {
        name: 'hnId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return lab;
};
