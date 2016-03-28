var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var API_SECRET = process.env.API_SECRET || 'magic_secret_key';  //TODO add info to Readme that we should pass API_SECRET as env var
if(!API_SECRET) {
  console.warn('missing a secret for jwt');
}

var expiresIn = 120;//10 * 60;//10 mintues

module.exports = {
  sign(obj) {
    var token = jwt.sign(
    obj,
    API_SECRET, {
      expiresIn: expiresIn
    });
    return token;
  },
  verify(token, cb) {
    console.log('verify token', token);
    var self = this;  //TODO cleanup this, self , etc
    jwt.verify(token, API_SECRET,(err, decoded) => {
      if (err) {
        cb(err);
      } else {
        console.log('signing new decoded token', decoded);
        var token = self.sign(decoded);
        cb(null,token);
      }
    });
  },
  loggedInRoute() {
    return expressJwt({ secret: API_SECRET});
  }
}
