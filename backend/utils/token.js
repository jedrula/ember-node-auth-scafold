var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var API_SECRET = process.env.API_SECRET || 'magic_secret_key';  //TODO add info to Readme that we should pass API_SECRET as env var
if(!API_SECRET) {
  console.warn('missing a secret for jwt');
}

var expiresIn = 10 * 60;//10 mintues

module.exports = {
  sign(user) {
    var token = jwt.sign({
      identification: user.identification,
      id: user._id,
      scopes: user.scopes
    }, API_SECRET, {
      expiresIn: expiresIn
    });
    return token;
  },
  verify(token, cb) {
    jwt.verify(token, API_SECRET,(err, decoded) => {
      if (err) {
        cb(err);
      } else {
        var token = this.sign(decoded);
        cb(null,token);
      }
    });
  },
  loggedInRoute() {
    return expressJwt({ secret: API_SECRET});
  }
}
