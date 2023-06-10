const { patient } = require('../models');

exports.createPatient = (patientData) => patient.create(patientData);

exports.getPatientbyId = (id) =>
  patient.findOne({
    where: {
      id: id,
    },
  });

exports.checkPatientExist = (hnId) =>
  patient.findOne({
    where: {
      hnId: hnId,
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
    ],
    order: [['updatedAt', 'DESC']],
  });
