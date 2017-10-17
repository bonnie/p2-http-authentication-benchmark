const { db } = require('../../db/db_connection')
const { insertUser } = require('../../db/db_queries')

const seedUsername = 'bonnie@bonnie'
const seedPassword = 'bonnie'

/**
  * Truncate the one table in the db.
  * @returns {Promise} - Promise whose resolution is unimportant
  */
const resetDB = () =>
  db.any('TRUNCATE TABLE users RESTART IDENTITY')

/**
  * Seed a user in the db.
  * @returns {Promise} - Promise which resolves to ID of added user
  */
const seedDB = () => {
  console.log('starting seedDB')
  return db.any(insertUser, [seedUsername, seedPassword])
}

/**
  * Reset and seed the db.
  * @returns {Promise} - Promise whose resolution is unimportant
  */
const initDB = () =>
  resetDB().then(seedDB)

module.exports = {
  initDB,
  seedUsername,
  seedPassword,
}
