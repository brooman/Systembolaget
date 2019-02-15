'use strict'
require('dotenv').config()

const express = require('express')
const app = express()
const api = require('./api')
const cron = require('node-cron')

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT} !`),
)

app.get('/', function (req, res) {
  res.sendFile('dist/app.js')
})

app.get('/api', async (req, res) => {
  const data = await api.fetchData(req.query)

  res.send(data)
})

if (process.env.UPDATE_MODE.toLowerCase() == 'cron' || process.env.UPDATE_MODE.toLowerCase() == 'all') {
  cron.schedule(process.env.UPDATE_CRON, async () => {
    console.log('Starting schedueled job')

    api.updateData()
  })
}

if (process.env.UPDATE_MODE.toLowerCase() == 'manual' | process.env.UPDATE_MODE.toLowerCase() == 'all') {
  app.get(process.env.UPDATE_PATH, async (req, res) => {
    api.updateData()

    res.send('Updated')
  })
}