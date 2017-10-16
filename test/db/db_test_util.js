const { db, pgp } = require('../../db/db_connection')

/**
  * Truncate the one table in the db.
  * @returns {Promise} - Promise whose resolution is unimportant
  */
const resetDB = () =>
  db.any('TRUNCATE TABLE users RESTART IDENTITY')

/**
  * Seed a user in the db.
  * @returns {Promise} - Promise whose resolution is unimportant
  */
const seedDB = () =>
  db.any(`INSERT INTO USERS (email, password)
            VALUES ($1, $2)`, ['bonnie@bonnie', 'bonnie'])


/**
  * Reset and seed the db.
  * @returns {Promise} - Promise whose resolution is unimportant
  */
const initDB = () =>
  resetDB().then(seedDB)

module.exports = { initDB }
