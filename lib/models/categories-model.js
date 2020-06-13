'use strict';
/**
 * @module categories-model this is to make categories has model function
 * @class categories this model will enherat the model calss and extend it to make categories calss with model function 
 */
const schema = require('./categories-schema');
const Model = require('./model.js');

class categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new categories();