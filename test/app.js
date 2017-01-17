const request = require('supertest');
const app = require('../server.js');

describe('GET /', () => {
    it('200 OK', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    })
})