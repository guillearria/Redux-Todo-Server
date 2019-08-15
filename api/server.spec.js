const request = require('supertest');

const server = require('./server.js'); // SYSTEM UNDER TEST (SUT)

describe('server.js', () => {
  it('should initiate in testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it('should return a JSON object', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/);
          expect(res.type).toBe('application/json');
        });
    });

    it('should return { api: "Server OK"} as the body', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual({ api: 'Server OK' });
          expect(res.body.api).toBe('Server OK');
        });
    });
  });
});
