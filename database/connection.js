'use strict';

const mongoose = require('mongoose')

//Models
const Product = require('./models/product.js')

//Connect to DB
mongoose.connect(process.env.DB_URL);

//Functions
module.exports = {
  insert: async (modelName, payload) => {

    //Create new instance of model
    const model = new this[modelName](payload)

    //Persist model
    await model.save()
  }
}