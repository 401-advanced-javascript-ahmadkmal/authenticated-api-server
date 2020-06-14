'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'ahmadkmal';
require('dotenv').config();
const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  fullName: { type: String },
  role: { type: String, enum: ['admin', 'editor', 'writer', 'user'] },
  token: { type: String },
});
users.pre('save', async function () {
  
  this.password = await bcrypt.hash(this.password, 5);
  this.role = 'user';
});

// users.statics.authenticateToken = async function authenticateToken (token) {
//   try {
//     const tokenObject = await jwt.verify(token, SECRET);
//     // tokenObject = {username:"mahmoud",iat:91223238}
//     const db= await this.schema.find({ username: tokenObject.username } );
//     if (db.length) {
//       return Promise.resolve(tokenObject);
//     } else {
//       return Promise.reject('User is not found!');
//     }
//   } catch (e) {
//     return Promise.reject(e.message);
//   }
// };
module.exports = mongoose.model('auth', users);