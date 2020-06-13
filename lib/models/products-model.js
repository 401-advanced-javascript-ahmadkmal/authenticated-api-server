'use strict';
/**
 * @module products-model this is to make prouducts has model function
 * @class products this model will enherat the model calss and extend it to make products calss with model function 
 */
const schema = require('./products-schema');
const Model = require('./model.js');

class products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new products();