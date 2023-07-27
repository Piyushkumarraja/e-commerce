const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');

describe('Search Functionality', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => {
      console.log('Connected to test database');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  it('Should search products by name', (done) => {
    const testData = [
      {
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        variants: [],
      },
      {
        name: 'Product 2',
        description: 'Description 2',
        price: 150,
        variants: [],
      },
      {
        name: 'Another Product',
        description: 'Some description',
        price: 200,
        variants: [],
      },
    ];

    request(app)
      .post('/api/products')
      .send(testData)
      .expect(201)
      .end(() => {
        request(app)
          .get('/api/products/search?q=Product%202')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0].name).to.equal('Product 2');
            expect(res.body[0].description).to.equal('Description 2');
            expect(res.body[0].price).to.equal(150);

            done();
          });
      });
  });

  // Write more tests for searching by description and variant name
});
