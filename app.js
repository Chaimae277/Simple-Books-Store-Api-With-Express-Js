const express = require ("express");
const app = express();
const PORT = 5000;

let books = [
  {
    id: 1,
    title: "Black Swan",
    author: "Nasim Taleb",
    description: "About Black Swan",
    price: 10,
    cover: "Soft Cover"
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    description: "About Rich Dad Poor Dad",
    price: 12,
    cover: "Soft Cover"
  }
];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find(d => d.id === parseInt(req.params.id));
  if(book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({"Message": "Book Not Found"});
  }
})

app.listen(PORT, () => console.log(`Welcome To Express JS`));