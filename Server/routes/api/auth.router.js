const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth.controllers");

router.post("/signup/client", authController.registerClient);
router.post("/signup/ventor", authController.registerVentor);
router.post("/signin", authController.login);
router.post("/verify", authController.verifyPassword);

module.exports = router;