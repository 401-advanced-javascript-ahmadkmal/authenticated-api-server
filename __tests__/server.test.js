
'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const { token1 } = require('morgan');
const mockRequest = supergoose(server);
let token ;
describe('categories API', () => {
  var id ;
  // let token ;


  it('can post()', () => {
    let obj = {'username': 'tas', 'password': '1234'};
    return  mockRequest.post('/api/v1/signup')
      .send(obj)
      .then(result=>{
        console.log(result.body);
        token =result.body.token;
        const obj = { name: 'hakona', description: 'batata' };
        return mockRequest
          .post('/api/v1/categories')
          .set({ 'authorization':`Bearer ${token}`})
          .send(obj)
          .then((data) => {
            const record = data.body; // _id
            console.log(record);
            console.log('this recorde to get id',record._id);
            Object.keys(obj).forEach((key) => {
              expect(record[key]).toEqual(obj[key]);
            });
            id = data.body._id;
          });
      });
 
  });

  it('can get()', () => {
    const obj = { name: 'orange', description: 'color' };
    return mockRequest
      .post('/api/v1/categories')
      .set({ 'authorization':`Bearer ${token}`})
      .send(obj)
      .then((data) => {
        console.log('can get ----------------->',data.body);
        return mockRequest.get('/api/v1/categories').set({ 'authorization':`Bearer ${token}`}).then((result) => {
          console.log('can get result -------------------------------------------------------------------------------------->',result.body);
          Object.keys(obj).forEach((key) => {
            expect(result.body.results[1][key]).toEqual(obj[key]);
          });
        });
      });
  });
  it('can get() by id', () => {
    const obj = { name: 'hakona', description: 'batata' };
    return mockRequest
      .get(`/api/v1/categories/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .then((data) => {
        console.log('can get() by id result',data.body);
        Object.keys(obj).forEach((key) => {
          expect(data.body[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can put() by id', () => {
    const obj = { name: 'noName' };
    const obj2 = { name: 'noName', description: 'batata' };
    return mockRequest
      .put(`/api/v1/categories/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .send(obj)
      .then((data) => {
        console.log('can put() by id result',data.body);
        return mockRequest.get(`/api/v1/categories/${id}`).set({ 'authorization':`Bearer ${token}`}).then((result) => {
          Object.keys(obj2).forEach((key) => {
            expect(result.body[0][key]).toEqual(obj2[key]);
          });
          
        });
        
      });
      
  });
  it('can delete() by id', () => {
    const obj2 = { name: 'noName', description: 'batata' };
    return mockRequest
      .delete(`/api/v1/categories/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .then((data) => {

       
        Object.keys(obj2).forEach((key) => {
          expect(data.body[key]).toEqual(obj2[key]);
        });

        return mockRequest.get('/api/v1/categories').set({ 'authorization':`Bearer ${token}`}).then((result) => {
          console.log('can delete() by id result',result.body);
          result.body.results.forEach((element) => {
            expect(element._id).not.toEqual(id);
          });
        });
      });
      
  });
});


describe('products API', () => {
  var id ;
  it('can post()', () => {
    const obj = {  name: 'hakona', category: 'batata',description: 'temon and pomba',price: '2$' };
    return mockRequest
      .post('/api/v1/products')
      .set({ 'authorization':`Bearer ${token}`})
      .send(obj)
      .then((data) => {
        const record = data.body; // _id
        id = data.body._id;
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  
  it('can get()', () => {
    const obj = { name: 'batata', category: 'hakona',description: 'temon and pomba',price: '2$' };
    return mockRequest
      .post('/api/v1/products')
      .set({ 'authorization':`Bearer ${token}`})
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/products').set({ 'authorization':`Bearer ${token}`}).then((result) => {
          console.log('data',result.body.results[0]);
          Object.keys(obj).forEach((key) => {
            expect(result.body.results[1][key]).toEqual(obj[key]);
          });
        });
      });
  });
  it('can get() by id', () => {
    const obj = {  name: 'hakona', category: 'batata',description: 'temon and pomba',price: '2$' };
    return mockRequest
      .get(`/api/v1/products/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .then((data) => {
        console.log('can get() by id result',data.body);
        Object.keys(obj).forEach((key) => {
          expect(data.body[0][key]).toEqual(obj[key]);
        });
      });
  });

  it('can put() by id', () => {
    const obj = { name: 'noName' };
    const obj2 = {  name: 'noName', category: 'batata',description: 'temon and pomba',price: '2$' };
    return mockRequest
      .put(`/api/v1/products/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .send(obj)
      .then((data) => {
        console.log('can put() by id result',data.body);
        return mockRequest.get(`/api/v1/products/${id}`).set({ 'authorization':`Bearer ${token}`}).then((result) => {
          Object.keys(obj2).forEach((key) => {
            expect(result.body[0][key]).toEqual(obj2[key]);
          });
          
        });
        
      });
      
  });
  it('can delete() by id', () => {
    const obj2 = {  name: 'noName', category: 'batata',description: 'temon and pomba',price: '2$' };
    return mockRequest
      .delete(`/api/v1/products/${id}`)
      .set({ 'authorization':`Bearer ${token}`})
      .then((data) => {

       
        Object.keys(obj2).forEach((key) => {
          expect(data.body[key]).toEqual(obj2[key]);
        });

        return mockRequest.get('/api/v1/products').set({ 'authorization':`Bearer ${token}`}).then((result) => {
          console.log('can delete() by id result',result.body);
          result.body.results.forEach((element) => {
            expect(element._id).not.toEqual(id);
          });
        });
      });
      
  });
});