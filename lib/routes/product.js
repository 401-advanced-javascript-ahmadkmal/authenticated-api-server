'use strict';
const express = require('express');
const product = require('../models/product-model');
const router = express.Router();

router.get('/products', (req, res,next) => {
  product
    .get()
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
});
router.post('/products', async (req, res , next) => {
  try {
    const data = await product.create(req.body);
    res.json(data);
  } catch (e) {
    next(e.message);
  }
});
router.get('/products/:id', (req, res,next) => {
  product
    .get(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
});
router.put('/products/:id', (req, res,next) => {
  product 
    .update(req.params.id,req.body)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));

});

router.delete('/products/:id', (req, res,next) => {
  product
    .delete(req.params.id)
    .then(data =>res.json(data))
    .catch(err=>next(err.message));
});





module.exports = router;