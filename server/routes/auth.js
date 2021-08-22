const express = require('express');
const router = express.Router();
const { signupValidator , signinValidator, validatorResult} = require('../middleware/validator');
const { signupController, signinController } = require('../controllers/auth');
const userController = require("../controllers/auth");

router.post('/signin', signinValidator, validatorResult, signinController);
router.post('/signup', signupValidator, validatorResult, signupController);

router.get("/", userController.readAll);
router.get("/:userId", userController.read);

module.exports = router;
