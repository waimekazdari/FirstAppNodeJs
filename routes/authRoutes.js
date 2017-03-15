var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function () {
  authRouter.route('/signUp')
        .post(function(req, res){
        //  console.log(req.body);
        var url = 'mongodb://localhost:27017/formationnode';
            mongodb.connect(url,function(err,db){
              var collection = db.collection('users');
              var user = {
                username: req.body.userName,
                password: req.body.password
              };

            collection.insert(user,function (err,results) {
              req.login(req.body, function () {
                  res.redirect('/auth/profile');
              });
            });
            });

        });

  authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });
  return authRouter;
};
module.exports = router;
