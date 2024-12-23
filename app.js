const express = require ('express');
// Init App
const app = express();
const PORT = 5000;
// Apply Middlewares
app.use(express.json());
const booksPath = require('./routes/books');
const authorsPath = require('./routes/authors');


app.use('/api/books', booksPath);
app.use('/api/authors', authorsPath);

app.get('/', (req, res) => {
  res.send("Home Page");
});



app.listen(PORT, () => console.log(`Welcome To Express JS`));