const express = require('express')
const api = express.Router();

const md_auth = require('../middlewares/authenticate');
const forum_controller = require('../controllers/forum')
api.post('/postquery',md_auth.authenticate,forum_controller.postquery)

api.post('/answerquery/:id',md_auth.authenticate,forum_controller.answerquery)
api.get('/questiondetail/:id',md_auth.authenticate,forum_controller.questiondetail)
 
api.get('/rightpost/:id',md_auth.authenticate,forum_controller.rightvote)
api.get('/wrongpost/:id',md_auth.authenticate,forum_controller.wrongvote)

api.get('/getfeed',md_auth.authenticate,forum_controller.getqueries)
api.get('/myqueries',md_auth.authenticate,forum_controller.myqueries) 
api.get('/myanswers/:id',md_auth.authenticate,forum_controller.getanswers)
api.get('/delete/:id',md_auth.authenticate,forum_controller.deletequery)


module.exports = api
