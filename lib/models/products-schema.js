'use strict';
/**
 * @module products schema
 * @param {object} products it have the schema for products that will be created 
 */
const mongoose = require('mongoose');

const products = mongoose.Schema({
  name: { type: String , required: true },
  category: { type: String , required: true },
  description: { type: String , required: true},
  price: { type: String , required: true},
});

module.exports = mongoose.model('api2', products);