const mongoose=require("mongoose")

//Create a book schema
const BookSchema = mongoose.Schema(
  {
    ISBN: String,
    title: String,
    pubDate: String,
    language: String,
    numpage: Number,
    author: [Number],
    publications: [Number],
    category: [String]
  }
);


