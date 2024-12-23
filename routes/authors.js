const express = require('express');
const router = express.Router();
const Joi = require('joi');

const authors = [
  {
    id: 1,
    firstName: "Chaimae",
    latsName: "Ess-bbah",
    nationality: "Moroccan",
    image: "default-image.png"
  },
];

// get, add, update, delete

module.exports = router;