var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav){
  var middlware = function(req, res, next){
    next();
  };

  var getIndex = function (req,res) {
      var url ='mongodb://localhost:27017/formationnode';
      mongodb.connect(url,function(err, db){
        var collection= db.collection('books');
        collection.find({}).toArray(
          function(err,results){
            res.render('books',{
              title:'Books',
              nav:nav,
              books:results
            });
        });
      });
  };

  var getById = function (req,res) {
      var id = new objectId(req.params.id);
      var url = 'mongodb://localhost:27017/formationnode';
      mongodb.connect(url,function(err, db){
        var collection=db.collection('books');
        collection.findOne({_id: id},
        function(err, results){
          if(results.bookId){
            bookService.getBookById(results.bookId,
                        function (err, boook) {
                          results.book = boook;
                          res.render('book',{
                            title:'book',
                            nav:nav,
                            book:results
                          });
                        });
          }else{
            res.render('book',{
              title:'book',
              nav:nav,
              book:results
            });
          }

          }
        );
      });
    }

  return {
    getIndex: getIndex,
    getById: getById,
    middlware: middlware
  }
}

module.exports = bookController;
