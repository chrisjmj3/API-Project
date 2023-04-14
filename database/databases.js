const books= [
  {
    ISBN: "12347",
    title: "Tesla!!!",
    pubDate: "2021-08-05",
    language: "english",
    numpage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech","space","education"]
  }
]

const author= [
  {
    Id: 1,
    name: "Jmj",
    books: ["12347","jklj"]
  },
  {
    Id: 2,
    name: "Joe",
    books: ["12347","Lang"]
  }
]

const publication= [
  {
    ID: 1,
    name: "Peace",
    books: ["12347"]
  }
]

module.exports = {books,author,publication};