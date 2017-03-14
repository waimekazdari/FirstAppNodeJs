var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb')
                        .MongoClient;

var books =[
      {
        title:'war ad peace',
        genre:'historical fiction',
        author:'Len Nicolayevich Tolstory',
        read:false
      },
      {
        title:'les misérables',
        genre:'historical fiction',
        author:'victor hugo',
        read:false
      }
];
var route = function(nav){
  adminRouter.route('/addBooks')
      .get(function (req,res) {
        // 27017 is the default port of mongodb
        var url = 'mongodb://localhost:27017/formationnode';
        //will connect mongodb
        mongodb.connect(url, function (err, db) {
          var collection = db.collection('books');
          collection.insertMany(books,
            function (err, results) {
            res.send(results);
            //db.close have to be inside like that ^^'
              db.close();
          });
        });
        //we don't have to use res.send 2 time in the same project
        // res.send('inserting books');
      });
  return adminRouter;
};

module.exports =route;
