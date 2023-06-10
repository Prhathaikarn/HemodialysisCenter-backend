const { User } = require('../models');

exports.createUser = (user) => User.create(user);

exports.getUserbyId = (id) =>
  User.findOne({
    where: {
      id,
    },
  });
exports.getUserbyNurseId = (nurseId) =>
  User.findOne({
    where: {
      nurseId,
    },
  });

exports.checkUserExist = (nurseId) =>
  User.findOne({
    where: {
      nurseId,
    },
  });
