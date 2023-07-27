const { expect } = require('chai');
const mongoose = require('mongoose');
const { Product } = require('../models/Product');

describe('Product Model', () => {
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

  it('Should store and retrieve a product correctly', async () => {
    const testData = {
      name: 'Test Product',
      description: 'This is a test product.',
      price: 50,
    };

    const product = await Product.create(testData);
    expect(product.name).to.equal(testData.name);
    expect(product.description).to.equal(testData.description);
    expect(product.price).to.equal(testData.price);

    const retrievedProduct = await Product.findById(product._id);
    expect(retrievedProduct.name).to.equal(testData.name);
    expect(retrievedProduct.description).to.equal(testData.description);
    expect(retrievedProduct.price).to.equal(testData.price);
  });
});
