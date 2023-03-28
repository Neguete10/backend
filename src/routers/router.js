const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const auth = require("../middlewares/auth");

// Signup
router.post("/signup", userController.createUser);
// Login
router.post("/login", userController.loginUser);
//Auth
router.get("/user", auth, userController.userAuth);
//Patients
router.get("/user/patients/:_id_root", userController.getPatients);
//Send .CSV
router.post("/user/exam", userController.exam);
//delete patient
router.delete("/user/patients/delete/:_id_root/:patientId", userController.deletePatient);
//update patient
router.put("/user/patients/edit/:_id_root/:patientId", userController.updatePatient);


//Error handler
//router.get("*", userController.error);
//router.post("*", userController.error);

module.exports = router;
