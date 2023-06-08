const userContoroller = require('../controllers/userController');
const express = require('express');
const authRouter = express.Router();

authRouter.post('/signup', userContoroller.signUp);
authRouter.post('/signin', userContoroller.signIn);
authRouter.post('/token', userContoroller.refreshToken);

module.exports = authRouter;
