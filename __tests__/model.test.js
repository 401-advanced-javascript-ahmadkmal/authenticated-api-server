'use strict';
require('@code-fellows/supergoose');
const categories = require('../lib/models/categories-model.js');
const product = require('../lib/models/products-model.js');
const obj = { name: 'hakona', description: 'batata' };
const obj2 = { name: 'hakona', category: 'batata', description: 'temon and pomba', price: '2$' };

describe('categories Model', () => {
  it('create', () => {
    return categories.create(obj).then((result) => {

      Object.keys(obj).forEach((key) => {
        expect(result[key]).toEqual(obj[key]);
      });
    });
  });
  it('get', () => {
    return categories.get().then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[0][key]).toEqual(obj[key]);
      });
    });
  });
  it('update', () => {
    return categories.create(obj).then((result) => {
      const obj3 = { name: 'batata', description: 'hakona' };

      categories.update(result.id, obj3).then(result2 => {

        Object.keys(obj3).forEach((key) => {
          expect(result2[key]).toEqual(obj3[key]);
        });
        expect(result2.id).toEqual(result.id);
      });

    });
  });
  it('delete', () => {
    return categories.create(obj).then((result) => {
      console.log('resulllt 11111', result);
      categories.delete(result.id).then(result2 => {
        console.log('resulllt2222222', result2);
        Object.keys(obj).forEach((key) => {
          expect(obj[key]).toEqual(result2[key]);
        });
      });

    });
  });
});
describe('product Model', () => {
  it('create', () => {
    return product.create(obj2).then((result) => {

      Object.keys(obj2).forEach((key) => {
        expect(result[key]).toEqual(obj2[key]);
      });
    });
  });
  it('get', () => {
    return product.get().then((result) => {
      Object.keys(obj2).forEach((key) => {
        expect(result[0][key]).toEqual(obj2[key]);
      });
    });
  });
  it('update', () => {
    return product.create(obj2).then((result) => {
      const obj4 = { name: 'batata', category: 'hakona', description: 'temon and pomba', price: '4$' };

      console.log('update 11111111111111',result);
      product.update(result.id, obj4).then(result2 => {
        console.log('update 33333333333',result2);
        Object.keys(obj4).forEach((key) => {
          
          expect(result2[key]).toEqual(obj4[key]);
        });
        expect(result2.id).toEqual(result.id);

      });
    });
  });
  it('delete product', () => {
    return product.create(obj2).then((result) => {

      product.delete(result.id).then(result2 => {
        Object.keys(obj2).forEach((key) => {
          expect(obj2[key]).toEqual(result2[key]);
        });
      });

    });
  });
});