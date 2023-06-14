const createError = require('../utils/create-error');
const patientService = require('../services/patient-service');

exports.addPatient = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      createError('You are unauthorize', 401);
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
    // // console.log('result---', result);
    // const a = JSON.parse(JSON.stringify(result));
    // console.log('a----', a);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPatientbyId = async (req, res, next) => {
  try {
    const { hnId } = req.params;
    const result = await patientService.getPatientbyId(hnId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updatePatientById = async (req, res, next) => {
  try {
    const { hnId } = req.params;
    console.log(req.body);
    const result = await patientService.updatePatientById(hnId, req.body);
    res.status(200).json({ message: 'Update Success !' });
  } catch (err) {
    next(err);
  }
};

exports.searchPatient = async (req, res, next) => {
  try {
    const result = await patientService.searchPatient(req.body.search);
    console.log(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const { hnId } = req.params;
    const result = await patientService.deletePatient(hnId);
    res.status(200).json({ message: 'Delete Success !' });
  } catch (err) {
    next(err);
  }
};
