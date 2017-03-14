var express = require('express');
var adminRouter = express.Router();

var route = function(nav){
  adminRouter.route('/addBooks')
      .get(function (req,res) {
         res.send('inserting books');
      });
  return adminRouter;
};

module.exports =route;
