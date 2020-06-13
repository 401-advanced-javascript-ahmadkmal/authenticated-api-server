'use strict';
/**
 * @module categories schema
 * @param {object} categories it have the schema for categories that will be created 
 */
const mongoose = require('mongoose');

const categories = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('api', categories);