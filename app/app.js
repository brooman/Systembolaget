'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const database = require('../database/connection.js')
const parser = require('fast-xml-parser')
const fetch = require('node-fetch')

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT} !`),
)

app.get('/data', function (req, res) {
  res.contentType('application/xml')
  res.sendFile(
    '/Users/laykith/Dropbox/public_html/yrgo/APK-Express/public/EXAMPLE_INDATA.xml',
  )
})

app.get('/', function (req, res) {})

app.get('/update', async function (req, res) {

  const fetchJSON = () => {
    return fetch('http://localhost:3000/data')
      .then(response => response.text())
      .then(data => {
        return parser.parse(data, {
          localeRange: 'åäö',
        });
      });
  }

  Object.keys(fetchJSON).forEach(item => {

    database.insert({
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
  })

  res.send('Succesful')
})