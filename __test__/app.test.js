const request = require('supertest');
const { describe, it } = require('mocha');
const app = require('./app');

describe('GET /', () => {
  it('responds with 200', async () => {
    const chai = await import('chai');
    const { expect } = chai;

    await request(app)
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.text).to.equal(
          '{"status":true,"message":"Server running successfully!"}'
        );
      });
  });
});
