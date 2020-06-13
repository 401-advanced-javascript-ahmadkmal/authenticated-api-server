  
const timestamp = require('../lib/middleware/timestamp');
describe('logger Middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();

  it('add requestTime to req', () => {
    timestamp(req, res, next);
    
    expect(req.requestTime).toBeDefined();
  });

});