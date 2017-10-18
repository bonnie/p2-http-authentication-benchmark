const { db } = require('./db_connection')
const { insertUser } = require('./db_queries.js')

/**
 * Add a user to the db
 * @param {string} email - email of user to add
 * @param {string} password - password
 * @returns {Promise} - Promise resolving to user ID
 */
const addUser = (email, password) =>
  db.one(insertUser, [email, password])
    .then(id => id.user_id)
    .catch((err) => {
      if (err.code === '23505') { // error code for violating duplicate key constraint
        return Promise.reject(`User ${email} already exists`)
      }
      return Promise.reject('an error occurred')
    })


module.exports = {
  addUser,
}
