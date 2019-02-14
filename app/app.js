'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const api = require('./api')
const cron = require('node-cron');

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT} !`),
)

app.get('/', function (req, res) {
  res.send('Front page')
})

app.get('/api', function (req, res) {
  res.send({
    result: ""
  })
})

if (process.env.UPDATE_MODE.toLowerCase() == "cron") {
  cron.schedule(process.env.UPDATE_CRON, async () => {

    console.log('Starting schedueled job')

    api.refresh()
  })

}

if (process.env.UPDATE_MODE.toLowerCase() == "manual") {
  app.get(process.env.UPDATE_PATH, async (req, res) => {
    api.refresh()

    res.send('Updated');
  })
}