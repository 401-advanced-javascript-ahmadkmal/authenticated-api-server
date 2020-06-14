'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'ahmadkmal';
require('dotenv').config();
class Model {
  constructor(schema) {
    this.schema = schema;
  }
  async create(record) {
    /**
   * record
   * {username:"mahmoud",password:"1234"}
   */
    console.log('recorde',record);
    let db =await this.schema.find({ username: record.username } );
    await console.log('search about user .... ',db);
    if (db.length === 0) {
      // console.log('inside creat');
      // record.password = await bcrypt.hash(record.password, 5);
      
      let newRecord = new this.schema(record);
      console.log('record after hash',newRecord);
      return await newRecord.save();
    }
    console.log('rejected');
    return Promise.reject('this user is already exist'); // ==>.catch
  }
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
  
  async list(){
    // console.log('inside list',await this.schema.find({ }));
    let allUsers = await this.schema.find({ });
    // console.log('inside list',allUsers);

    return allUsers;
  }
  async  generateToken(user){
    const token = await jwt.sign({ username: user.username,_id: user._id,role:user.role }, SECRET,{expiresIn: '15m'});
    return token;
  }
  async  authenticate(user, pass) {
    let userInfo = await this.schema.find({username : user});
    console.log('userInfo inside authentication :',userInfo);
    try{
      const valid = await bcrypt.compare(pass, userInfo[0].password);
      console.log('valid or not :',valid);
      return valid ? userInfo : Promise.reject('wrong password');
    }catch(e){
      console.log(e.message);
    }
  
  
  }
  // async authenticateToken (token) {
  //   // akjsndlaksnd.34naliendiasnd.3nksabndfw334ng
  //   try {
  //     const tokenObject = await jwt.verify(token, SECRET);
  //     // tokenObject = {username:"mahmoud",iat:91223238}

  //     if (db[tokenObject.username]) {
  //       return Promise.resolve(tokenObject);
  //     } else {
  //       return Promise.reject('User is not found!');
  //     }
  //   } catch (e) {
  //     return Promise.reject(e.message);
  //   }
  // }
  async  authenticateToken (token) {
    try {
      const tokenObject = await jwt.verify(token, SECRET);
      // tokenObject = {username:"mahmoud",iat:91223238}
      const db= await this.schema.find({ _id: tokenObject._id } );
      if (db.length) {
        console.log('authenticateToken function there is data in db');
        console.log('db.token',db[0].token);
        console.log('received token',token);
        if(db[0].token===token){
          return Promise.resolve(tokenObject);
        }
        console.log('token inside bd different than received');
        return Promise.reject('session end for this token');  
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}

module.exports = Model;