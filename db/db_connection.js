const pgp = require('pg-promise')()

const connection = process.env.NODE_ENV === 'test'
  ? 'postgres:///httpauth_test'
  : 'postgres:///httpauth'

const db = pgp(connection)

module.exports = { db, pgp }
