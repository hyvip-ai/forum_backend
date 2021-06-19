const jwt = require('jwt-simple')
const mysecret = "This_Is_My_Secret_which_is_None"

function authenticate(req,res,next){
    // console.log(req.headers.auth)
    var payload = jwt.decode(req.headers.auth,mysecret);
    req.user = payload;
    next();
}

module.exports = {
    authenticate
}