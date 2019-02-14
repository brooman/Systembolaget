const database = require('../database/connection.js')
const parser = require('fast-xml-parser')
const fetch = require('node-fetch')

module.exports = {
  refresh: async () => {
    const fetchJSON = () => {
      return fetch('https://www.systembolaget.se/api/assortment/products/xml')
        .then(response => response.text())
        .then(data => {
          return parser.parse(data, {
            localeRange: 'åäö',
          })
        })
        .catch(err => console.error(err));
    }

    const data = await fetchJSON()

    data.artiklar.artikel.forEach(item => {

      database.updateOrCreate(item);
    })
  }
}