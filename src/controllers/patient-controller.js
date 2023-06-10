const createError = require('../utils/create-error');
const patientService = require('../services/patient-service');

exports.addPatient = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      createError('you are unauthorize', 401);
    }
    const value = req.body;
    const isPatientExist = await patientService.checkPatientExist(value.hnId);
    if (isPatientExist) {
      createError('Patient already have', 400);
    }
    const addPatient = await patientService.createPatient(value);
    res.status(200).json({ message: 'Add Success !' });
  } catch (err) {
    next(err);
  }
};

exports.getAllPatient = async (req, res, next) => {
  try {
    const result = await patientService.getAllPatient();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
