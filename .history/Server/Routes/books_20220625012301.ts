// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //if error occurs
    book.find((err, books)=> {
      if(err){
        return console.error(err);
      }else{
        res.render('books/details', {
          title: 'Add books',
          page: 'add',
          books: books

      });
      }
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //call book data
    let newBook =  new book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Description": "",
      "Author": req.body.author,
      "Genre": req.body.genre

    });
    book.create(newBook, function(err: CallbackError)
    {
      //if error occurs
      if(err){
        console.error(err);
        res.end(err);
    }
    res.redirect('/books');

    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.findById(id,{},{},function(err, booksToEdit)
    {
      //if error occurs
      if(err){
        console.error(err);
        res.end(err);
      }
      //log for trigger
      console.log("Edit Books", booksToEdit);
      res.render('books/details', {
        title: 'Edit book', 
        page: 'details',
        books: booksToEdit 
      });

    });
   

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //Process book data for edit
     let id=req.params.id;
     let updateBooks = new book
    ({
      "_id":id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Description": "",
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    book.updateOne({_id:id}, updateBooks, function(err: CallbackError)
    {
      //if error occurs
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect('/books');

    })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //process to get data to deleted
    let id = req.params.id;
    book.remove({_id:id}, function(err: CallbackError)
    {
      //if error occurs
      if(err)
      {
          console.error(err);
          res.end(err);
      }
      res.redirect('/books');
    });
});


//module.exports = router;