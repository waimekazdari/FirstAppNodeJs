var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
    //useName is a name of fiels text in indexe.ejs ..
        usernameField: 'userName',
        passwordField: 'password'
      },
      function (username, password, done) {
        var user = {
          username: username,
          password: password
        };
        done(null, user);
      }

  ));
};
