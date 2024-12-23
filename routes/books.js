const express = require('express');
const router = express.Router();
const Joi = require("joi");

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

/**
 * @desc    Get All Books
 * @route   /api/books
 * @method  GET
 * @access  public
*/
router.get("/", (req, res) => {
  res.json(books);
});

/**
 * @desc    Get One Book By ID
 * @route   /api/books/:id
 * @method  GET
 * @access  public
*/
router.get("/:id", (req, res) => {
  const book = books.find(d => d.id === parseInt(req.params.id));
  if(book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({"Message": "Book Not Found"});
  }
});

/**
 * @desc    Add New Book
 * @route   /api/books
 * @method  POST
 * @access  public
*/
router.post("/", (req, res) => {
  // Validation Without JOI
  // if(!req.body.title || req.body.title.length < 3) {
  //   return res.status(400).json("Title Is Required And Must Be More Than 3 Characters");
  // }

  const { error } = validateCreateBook(req.body);
  if(error) {
    return res.status(400).json({message: error.details[0].message});
    // OR
    // return res.status(400).json(error);
  }
  // console.log(req.body);
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
  res.status(201).json({"Message" : `Book With ID ${book.id} Created Successfully`}); // 201 => Created Successfully
  // Return With New Book Info
  // res.status(201).json(book);
});

/**
 * @desc    Update A Book By ID
 * @route   /api/books/:id
 * @method  PUT
 * @access  public
*/
router.put('/:id', (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if(error) {
    return res.status(400).json({message: error.details[0].message});
  }

  const book = books.find(d => d.id === parseInt(req.params.id));
  if(book) {
    res.status(200).json({message : "Book has been updated "});
  } else {
    res.status(404).json({message : "Book not found"});
  }
});

/**
 * @desc    Delete A Book By ID
 * @route   /api/books/:id
 * @method  DELETE
 * @access  public
*/
router.delete('/:id', (req, res) => {
  const book = books.find(d => d.id === parseInt(req.params.id));
  if(book) {
    res.status(200).json({message : "Book has been deleted "});
  } else {
    res.status(404).json({message : "Book not found"});
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Validate Create Book With JOI
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().trim().min(3).max(200).required(),
    description: Joi.string().trim().min(3).max(500).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().trim().required(),
  });

  return schema.validate(obj);
}

// Validate Update Book With JOI
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string().trim().min(3).max(200),
    description: Joi.string().trim().min(3).max(500),
    price: Joi.number().min(0),
    cover: Joi.string().trim(),
  });

  return schema.validate(obj);
}

module.exports = router;