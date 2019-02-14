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

app.get('/', function (req, res) {})

app.get('/update', async function (req, res) {

  const fetchJSON = () => {
    return fetch('http://localhost:3000/data')
      .then(response => response.text())
      .then(data => {
        return parser.parse(data, {
          localeRange: 'åäö',
        })
      })
  }

  const data = await fetchJSON()

  Object.keys(data).forEach(item => {
    database.import(item);
  })

  res.send('Succesful')
})

//Temp route
app.get('/data', function (req, res) {
  res.contentType('application/xml')
  res.sendFile(
    '/Users/laykith/Dropbox/public_html/yrgo/APK-Express/public/EXAMPLE_INDATA.xml',
  )
})