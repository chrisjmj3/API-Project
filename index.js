require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
//Database
const database = require("./databases");

const booky = express();

booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());
                                                                                      
mongoose.connect(process.env.MONGO_URL,
/*{
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
}*/).then(()=> console.log("Connection Established"));

/*
route   /
Description  Get all books
Access  Public
Publisher Non 
Methods  Get
*/ 


booky.get   ("/",(req,res ) => {
  return res.json({books: database.books});
  });

/*
route   /is
Description  Get specified books on isbn
Access  Public
Parameter isbn
Methods  Get
*/ 

booky.get   ("/is/:isbn",(req,res ) => {     //colon put here is to make it aware that next value is dynamic
const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);        
if (getSpecificBook.length===0)
{
  return res.json({error :`No book found for the isbn ${req.params.isbn}`});
}
return res.json({book : getSpecificBook});
});

/*
route   /c
Description  Get specified books on category
Access  Public
Parameter category
Methods  Get
*/ 

booky.get   ("/c/:category",(req,res ) => {
  const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category) );        
  if (getSpecificBook.length===0)
  {
    return res.json({error :`No book found for the category ${req.params.category}`});
  }
  return res.json({book : getSpecificBook});
  });

  /*
route   /lang
Description  Get specified books on language
Access  Public
Parameter language
Methods  Get
*/ 

booky.get   ("/lang/:language",(req,res ) => {
  const getSpecificBook = database.books.filter((book) => book.language.includes(req.params.language) );        
  if (getSpecificBook.length===0)
  {
    return res.json({error :`No book found with the language ${req.params.language}`});
  }
  return res.json({book : getSpecificBook});
  });

   /*
route   /author
Description  Get all author
Access  Public
Parameter none
Methods  Get
*/ 

booky.get   ("/author",(req,res ) => {
  return res.json({books: database.author});
  });

/*
route   /author/id
Description  Get specified author
Access  Public
Parameter id
Methods  Get
*/   

booky.get   ("/author/Id/:id",(req,res ) => {     //colon put here is to make it aware that next value is dynamic
  const getSpecificAuthor = database.author.filter((author) => author.Id === parseInt(req.params.id));  //carefull as here author.id is a int and req.params.id is a string so while putting triple equal to write parseint       
  if (getSpecificAuthor.length===0)
  {
    return res.json({error :`No book found written by author with id ${req.params.id}`});
  }
  return res.json({author : getSpecificAuthor});
  });

/*
route   /author/book
Description  Get specified author
Access  Public
Parameter id
Methods  Get
*/   

booky.get ("/author/book/:isbn",(req,res ) => {     
  const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));        
  if (getSpecificAuthor.length===0)
  {
    return res.json({error :`No book found written by author with id ${req.params.id}`});
  }
  return res.json({author : getSpecificAuthor});
  });


  /*****Post request******/

 /*
route   /book/new
Description  To add new books
Access  Public
Parameter None
Methods  post
*/   
booky.post("/book/new",(req,res)=>{
  const newbook=req.body;
  database.books.push(newbook);
  return res.json({updateBooks: database.books})
});

 /*
route   /author/new
Description  To add new authors
Access  Public
Parameter None
Methods  post
*/   
booky.post("/author/new",(req,res)=>{
  const newAuthor=req.body;
  database.author.push(newAuthor);
  return res.json({updateBooks: database.author})
});

/*
route  /publication/new
Description  To add new authors
Access  Public
Parameter None
Methods  post
*/   
booky.post("/publication/new",(req,res)=>{          //Create a get request for publication....................................
  const newPublication=req.body;                    //and also its subsequent steps
  database.publication.push(newPublication);
  return res.json({updateBooks: database.publication})
});


 /*****Put request******/



 //complete 


  /*****Delete request******/

/*
route  /book/delete
Description  Delete a book
Access  Public
Parameter isbn
Methods  delete
*/   

booky.delete("/book/delete/:isbn",(req,res)=> {
  const updatedBookDatabase= database.books.filter((book)=>book.ISBN !== req.params.isbn);
  database.books = updatedBookDatabase;
  return res.json({books:database.books});
});

/*
route  /author/delete
Description  Delete a author
Access  Public
Parameter id
Methods  delete
*/   

booky.delete("/author/delete/:id",(req,res)=> {
  const updatedAuthorDatabase= database.author.filter((authors)=>authors.Id !== parseInt(req.params.id));
  database.author = updatedAuthorDatabase;
  return res.json({books:database.author});
});

/*
route  /book/delete/author
Description  Delete an author from a given book and vice versa
Access  Public
Parameter id,isbn
Methods  delete*/

   

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=> {
  //update the book database 
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn){
    const newAuthor =book.author.filter((eachAuthor) => eachAuthor !== parseInt(req.params.authorId));
    book.author = newAuthor;
      return;
    }
  }) ;

  //update the author database
  database.author.forEach((auth)=>{
    if(auth.Id === parseInt(req.params.authorId)){
      const newBook = auth.books.filter((eachbook) => eachbook !== req.params.isbn);
      auth.books = newBook;
      return;
    }
  });
  return res.json({
    book : database.books,
    author : database.author,
    message : "Author was successfully deleted"
  });
});



  booky.listen(3000,() => { 
  console.log("Server is up and running");
});