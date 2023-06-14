module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patient',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      hnId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      thaiNationalId: {
        type: DataTypes.STRING(13),
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      age: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{2}$/,
        },
      },
      mobilePhone: {
        type: DataTypes.STRING,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      doctorFname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      doctorLname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );
  patient.associate = (models) => {
    patient.hasMany(models.lab, {
      foreignKey: {
        name: 'hnId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return patient;
};
