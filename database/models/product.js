'use strict';

const productSchema = require('../schemas/productSchema');

let Product = mongoose.model('Product', productSchema);