var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var API_SECRET = process.env.API_SECRET || 'magic_secret_key';  //TODO add info to Readme that we should pass API_SECRET as env var
if(!API_SECRET) {
  console.warn('missing a secret for jwt');
}

var expiresIn = 2 * 24 * 60 * 60;//2 days

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
    var self = this;  //TODO cleanup this, self , etc
    jwt.verify(token, API_SECRET,(err, decoded) => {
      if (err) {
        cb(err);
      } else {
        var token = self.sign(decoded);
        cb(null,token);
      }
    });
  },
  expressJwtMiddleware() {
    return expressJwt({ secret: API_SECRET});
  }
}
