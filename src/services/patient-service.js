const { Op } = require('sequelize');
const { lab, patient } = require('../models');

exports.createPatient = (patientData) => patient.create(patientData);

exports.getPatientbyId = (hnId) =>
  patient.findOne({
    where: {
      hnId,
    },
  });

exports.checkPatientExist = (hnId) =>
  patient.findOne({
    where: {
      hnId,
    },
  });

exports.getAllPatient = () =>
  patient.findAll({
    attributes: [
      'hnId',
      'firstName',
      'lastName',
      'doctorFname',
      'doctorLname',
      'updatedAt',
      'mobilePhone',
      'thaiNationalId',
    ],
    order: [['updatedAt', 'DESC']],
  });

exports.updatePatientById = (hnId, body) =>
  patient.update(body, {
    where: { hnId },
  });

exports.searchPatient = async (search) => {
  const searching = await patient.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { hnId: { [Op.like]: `%${search}%` } },
      ],
    },
  });
  return searching;
};

exports.deletePatient = async (hnId) => {
  const deletePatient = await patient.destroy({
    where: { hnId },
  });
  return deletePatient;
};

exports.createLab = (labData) => lab.create(labData);
