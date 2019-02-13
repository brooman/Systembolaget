'use strict';

const mongoose = require('mongoose')

//Models
const Product = require('./models/product.js')

//Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});

//Functions
module.exports = {
  insert: async (payload) => {

    //Create new instance of model
    const model = new Product(payload)

    //Persist model
    await model.save()
  }
}