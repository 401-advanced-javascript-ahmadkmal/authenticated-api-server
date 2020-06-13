'use strict';
const express = require('express');
const categories = require('../models/categories-model');
const router = express.Router();

router.get('/categories', (req, res,next) => {
  categories
    .get()
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
});
router.post('/categories', async (req, res , next) => {
  try {
    const data = await categories.create(req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
});
router.get('/categories/:id', (req, res,next) => {
  categories
    .get(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
});
router.put('/categories/:id', (req, res,next) => {
  categories 
    .update(req.params.id,req.body)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));

});

router.delete('/categories/:id', (req, res,next) => {
  categories
    .delete(req.params.id)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));
});





module.exports = router;