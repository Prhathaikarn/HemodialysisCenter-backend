const express = require('express');

const patientController = require('../controllers/patient-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/addpatient', authenticate, patientController.addPatient);
router.get('/getallpatient', authenticate, patientController.getAllPatient);

module.exports = router;
