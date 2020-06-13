'use strict';
/**
 * @module router 
 * @exports express.Router this module to spicfay the route and to hundel function
 */
const express = require('express');
const params = require('../middleware/params');
const router = express.Router();

router.param('model',params);

router.get('/:model', getAllHandler);
router.get('/:model/:id', getOneHandler);
router.post('/:model', postHandler);
router.put('/:model/:id',putAllHandler);
router.delete('/:model/:id',deleteAllaunler) ;

/**
 * @function putAllHandler function to hunndel the update when the requist method is put
 * @param {object} req this object have the req param and the object data to update
 * @param {object} res this will have a object after update as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
function putAllHandler(req, res,next)  {
  req.model 
    .update(req.params.id,req.body)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));
    
}
/**
 * @function deleteAllaunler function to hunndel the delete when the requist method is delete
 * @param {object} req this object have the req param 
 * @param {object} res this will have a object that has been deleted as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
function deleteAllaunler(req, res,next)  {
  req.model
    .delete(req.params.id)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));
}
/**
 * @function getAllHandler function to hunndel the get all object when the requist method is get
 * @param {object} req this object have the req param 
 * @param {object} res this will have the number of object and the the object as array inside result 
 * @param {function} next this function to callback after the function done  
 */
function getAllHandler(req, res, next) {
  req.model
    .get()
    .then((data) => res.json({count:data.length ,'results': data}))
    .catch((err) => next(err.message));
}
/**
 * @function getOneHandler function to hunndel the get one opject when the route has id extention 
 * @param {object} req this object have the req param and the id for the object
 * @param {object} res this will have a object with the requisted id as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
function getOneHandler(req, res, next) {
  req.model
    .get(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}
/**
 * @function postHandler function to hunndel the creat when the requist method is post
 * @param {object} req this object have the req param and the object data to creat
 * @param {object} res this will have a object after iit has been createn  as a json pakage  
 * @param {function} next this function to callback after the function done  
 */
async function postHandler(req, res, next) {
  try {
    const data = await req.model.create(req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
}

module.exports = router;