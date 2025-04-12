const { signup, login, getUserDetails } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/Middlewares');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

router.get('/user', getUserDetails);


module.exports = router;
