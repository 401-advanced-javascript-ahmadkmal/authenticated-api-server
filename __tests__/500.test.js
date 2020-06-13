'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
describe('500 error', () => {
  
  it('return 500 return', () => {
    const obj = { name: 'orange ju' ,description: 'vit c',price:'2$'};
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((results) => {
        expect(results.status).toBe(500);
      });
  });
  it('return 500 return', () => {
    const obj = { name: 'orange ju' ,description: 'vit c',price:'2$' };
    return mockRequest
      .post('/api/v1/product')
      .send(obj)
      .then((results) => {
        expect(results.status).toBe(500);
      });
  });
});