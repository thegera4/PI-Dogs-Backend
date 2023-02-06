const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators and Create Dog', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
          height: '10 - 15',
          weight: '4 - 6',
          lifespan: '8 - 12',
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if weight is null', (done) => {
        Dog.create({
          name: 'Pug',
          height: '10 - 15',
          lifespan: '8 - 12',
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should throw an error if height is null', (done) => {
        Dog.create({
          name: 'Pug',
          weight: '4 - 6',
          lifespan: '8 - 12',
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should create dog when its a valid name', () => {
        return Dog.create({
          name: 'Pug',
          height: '10 - 15',
          weight: '4 - 6',
          lifespan: '8 - 12',
        })
        .then((dog) => {
          expect(dog.name).to.equal('Pug');
          });
        });
      it('should create dog when its a valid weight', () => {
        return Dog.create({
          name: 'Pug',
          height: '10 - 15',
          weight: '4 - 6',
          lifespan: '8 - 12',
        })
        .then((dog) => {
          expect(dog.weight).to.equal('4 - 6');
        });
      });
      it('should create dog when its a valid height', () => {
        return Dog.create({
          name: 'Pug',
          height: '10 - 15',
          weight: '4 - 6',
          lifespan: '8 - 12',
        })
        .then((dog) => {
          expect(dog.height).to.equal('10 - 15');
        });
      });
    });
  });
});