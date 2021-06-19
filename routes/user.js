const express = require('express')
const api = express.Router()
const user_controller = require('../controllers/user')
// const md_auth = require('../middlewares/authenticate')
api.post('/register',user_controller.register);
api.post('/login',user_controller.login);


module.exports = api