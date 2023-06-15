const express = require('express');

const patientController = require('../controllers/patient-controller');
// const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/addpatient', patientController.addPatient);
router.get('/getallpatient', patientController.getAllPatient);
router.get('/getpatientbyid/:hnId', patientController.getPatientbyId);
router.put('/updatepatientbyid/:hnId', patientController.updatePatientById);

router.post('/searchpatient', patientController.searchPatient);

router.delete('/deletepatient/:hnId', patientController.deletePatient);

router.post('/addlab', patientController.addLab);

module.exports = router;
