# Systembolaget API Wrapper

Express + MongoDB application to make working with Systembolagets public XML "API" a breeze.

## What? Explain more.

[Systembolagets API](https://www.systembolaget.se/api) is in reality just a data dump which is published nightly. Using [Cron](https://en.wikipedia.org/wiki/Cron) we can download the XML nightly, parse it and store it in a MongoDB database for easy querying. This Express server also exposes endpoints for querying and retriving data from the database.

## Feature list

- CRON jobs for updating data nightly
- Toggle between CRON and Manual update mode
- Configurable data structure and naming
- Fast data parsing

## Planned features

- Regex search to prevent case sensitivity
- Access tokens
- Configurable restrictions on search, (Not just pass query string into Mongoose .find() )
- Better error handling
