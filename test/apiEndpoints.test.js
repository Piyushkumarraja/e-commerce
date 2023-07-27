const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming your app is exported from app.js

describe('API Endpoints', () => {
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

  it('Should create a new product', (done) => {
    const testData = {
      name: 'Test Product',
      description: 'This is a test product.',
      price: 50,
      variants: [
        { name: 'Variant 1', sku: 'SKU001', additionalCost: 10, stockCount: 100 },
      ],
    };

    request(app)
      .post('/api/products')
      .send(testData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.name).to.equal(testData.name);
        expect(res.body.description).to.equal(testData.description);
        expect(res.body.price).to.equal(testData.price);
        expect(res.body.variants[0].name).to.equal(testData.variants[0].name);
        expect(res.body.variants[0].sku).to.equal(testData.variants[0].sku);
        expect(res.body.variants[0].additionalCost).to.equal(
          testData.variants[0].additionalCost
        );
        expect(res.body.variants[0].stockCount).to.equal(
          testData.variants[0].stockCount
        );

        done();
      });
  });

  // Write more tests for other endpoints such as GET, PUT, DELETE, etc.
});
