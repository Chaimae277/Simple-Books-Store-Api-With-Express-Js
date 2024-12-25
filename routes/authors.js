const express = require('express');
const router = express.Router();
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../Models/Author");


/**
 * @desc    Get All Authors
 * @route   /api/authors
 * @method   GET
 * @access  public
*/
router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find().sort({firstName: 1})
  // .select("firstName lastName nationality -_id");  
  //Sort Data From A-Z  // Select : to get just FirstName  LastName and Nationality Without ID.
  res.status(200).json(authorList);
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message : "Something Went Wrong!"
    });
  }
});

/**
 * @desc    Get One Author By ID
 * @route   /api/authors/:id
 * @method  GET
 * @access  public
*/
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
  if(author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({
      "Message": "Author Not Found"
    });
  }
  } catch(error) {
    console.log(error);
    res.status(500).json({
      message : "Something Went Wrong!"
    });
  }
});

/**
 * @desc    Add New Author
 * @route   /api/authors
 * @method  POST
 * @access  public
*/
router.post("/", async (req, res) => {
  // Validation Without JOI
  // if(!req.body.title || req.body.title.length < 3) {
  //   return res.status(400).json("Title Is Required And Must Be More Than 3 Characters");
  // }

  const { error } = validateCreateAuthor(req.body);
  if(error) {
    return res.status(400).json({
      message: error.details[0].message
    });
    // OR
    // return res.status(400).json(error);
  }
  // console.log(req.body);
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save() //Save In DataBase
    // Return With Info Message
    // res.status(201).json({"Message" : `Author With ID ${author.id} Created Successfully`}); // 201 => Created Successfully
    // Return With New Author Info
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message : "Something Went Wrong"
    });
  }
});

/**
 * @desc    Update An Author By ID
 * @route   /api/authors/:id
 * @method  PUT
 * @access  public
*/
router.put('/:id', async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if(error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      }
    }, { new: true });
    res.status(200).json(author);
  } catch(error) {
    console.log(error);
    res.status(501).json({
      message : "Something Went Wrong"
    });
  }
});

/**
 * @desc    Delete An Author By ID
 * @route   /api/authors/:id
 * @method  DELETE
 * @access  public
*/
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
  if(author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message : "Author has been deleted"
    });
  } else {
      res.status(404).json({
        message : "Author not found"
      });
    }
  } catch(error) {
    console.log(error);
    res.status(501).json({
      message : "Something Went Wrong"
    });
  }
});

module.exports = router;