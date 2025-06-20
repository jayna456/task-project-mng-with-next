const router = require('express').Router();
const User = require('../controller/user.js');

router.post('/login', User.login);
router.post('/signup', User.signup);

module.exports = router;