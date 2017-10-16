const db = require('./db_connection').db

/**
 * Add a user to the db
 * @param {string} email - email of user to add
 * @param {string} password - password
 * @returns {Promise} - Promise resolving to user ID
 */
const addUser = (email, password) => {
  return new Promise('hi there')
}

module.exports = {
  addUser,
}
