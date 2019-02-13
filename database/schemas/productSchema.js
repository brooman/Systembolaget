'use strict';

const Schema = mongoose.Schema

module.exports.productSchema = new Schema({
  //Product Identifiers
  ProductNumber: Number,
  ProductNumberShort: Number,
  ProductId: Number,

  //Name
  Name: String,
  NameExtention: String,

  //Price
  Price: Number,
  PriceCompare: Number,
  APK: Number,

  //Content
  Volume: Number,
  Alcohol: Number,

  //Assortment
  Assortment: String,
  AssortmentText: String,
  Type: String,
  Style: String,

  //Make
  Producer: String,
  Supplier: String,
  Area: String,  
  Country: String,
  Packaging: String,
  Year: Number,

  //Filters
  Organic: Boolean,
  Ethical: Boolean,
  Koscher: Boolean,
  Expired: Boolean,
  SaleStart: Date

})