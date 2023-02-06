/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);

describe('GET /temperaments route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /temperaments', () => {
    it('should get status 200 and the list of all temperaments', () =>
      agent.get('/temperaments').expect(200)
    );    
  });
});
