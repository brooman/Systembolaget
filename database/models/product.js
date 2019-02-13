'use strict';

const mongoose = require('mongoose')

const productSchema = require('../schemas/productSchema');

module.exports.Product = mongoose.model('Product', productSchema);