var express = require('express')
var bookRouter = express.Router();


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
]

bookRouter.route('/')
  .get(function (req,res) {
    res.render('books',{
      title:'Books',
      nav:[{
        Link:'/Books',
        Text:'Books'
      },{
        Link:'/Authors',
        Text:'Authors'
      }],
      books: books
    });
  });
bookRouter.route('/:id')
  .get(function (req,res) {
    var id = req.params.id;
    res.render('book',{
      title:'Books',
      nav:[{
        Link:'/Books',
        Text:'Books'
      },{
        Link:'/Authors',
        Text:'Authors'
      }],
      books: book[id];
    });
  });

module.exports=bookRouter;
