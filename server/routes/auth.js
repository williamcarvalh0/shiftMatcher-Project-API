const express = require('express')
const router = express.Router()
const {
  signupValidator,
  signinValidator,
  validatorResult,
} = require('../middleware/validator')
const { signupController, signinController } = require('../controllers/auth')

router.post('/signin', signinValidator, validatorResult, signinController)
router.post('/signin', signupValidator, validatorResult, signupController)

module.exports = router
