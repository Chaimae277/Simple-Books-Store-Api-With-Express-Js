const express = require ("express");
// Init App
const app = express();
const PORT = 5000;
// Apply Middlewares
app.use(express.json());


const books = [
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

// Get All Books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Get One Book By ID
app.get("/api/books/:id", (req, res) => {
  const book = books.find(d => d.id === parseInt(req.params.id));
  if(book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({"Message": "Book Not Found"});
  }
});

// Add New Book
app.post("/api/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  }
  books.push(book);
  // Return With Info Message
  res.status(201).json({"Message" : "Book Created Successfully"}); // 201 => Created Successfully
  // Return With New Book Info
  // res.status(201).json(book);
})





app.listen(PORT, () => console.log(`Welcome To Express JS`));