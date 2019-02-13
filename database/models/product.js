'use strict';

const productSchema = require('../schemas/productSchema');

module.exports.Product = mongoose.model('Product', productSchema);