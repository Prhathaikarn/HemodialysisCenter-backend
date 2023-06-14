const express = require('express');

const patientController = require('../controllers/patient-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/addpatient', authenticate, patientController.addPatient);
router.get('/getallpatient', authenticate, patientController.getAllPatient);
router.get(
  '/getpatientbyid/:hnId',
  authenticate,
  patientController.getPatientbyId
);
router.put(
  '/updatepatientbyid/:hnId',
  authenticate,
  patientController.updatePatientById
);

router.post('/searchpatient', authenticate, patientController.searchPatient);

router.delete(
  '/deletepatient/:hnId',
  authenticate,
  patientController.deletePatient
);

module.exports = router;
