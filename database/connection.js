'use strict';

const mongoose = require('mongoose')

//Models
const Product = require('./models/Product');

//Connect to DB
const connection = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
})

module.exports = {

  import: (item) => {

    const newProduct = new Product({
      ProductNumber: item.nr,
      ProductNumberShort: item.Varnummer,
      ProductId: item.Artikelid,

      //Name
      Name: item.Namn,
      NameExtention: item.Namn2,

      //Price
      Price: item.Prisinklmoms,
      PriceCompare: item.PrisPerLiter,
      //APK: Number,

      //Content
      Volume: item.Volymiml,
      Alcohol: item.Alkoholhalt,

      //Assortment
      Assortment: item.Sortiment,
      AssortmentText: item.SortimentText,
      Type: item.Typ,
      Style: item.Stil,

      //Make
      Producer: item.Producent,
      Supplier: item.Leverantor,
      Area: item.Ursprung,
      Country: item.Ursprunglandnamn,
      Packaging: item.Forpackning,
      Year: item.Argang,

      //Filters
      Organic: item.Ekologisk,
      Ethical: item.Etiskt,
      Koscher: item.Koscher,
      Expired: item.Utgått,
      SaleStart: item.Saljstart
    })

    newProduct.save(function (err) {
      if (err) throw err;

      console.log('User created!');
    });
  }
}