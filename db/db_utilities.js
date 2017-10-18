const { db } = require('./db_connection')
const { insertUser } = require('./db_queries.js')

/**
 * Add a user to the db
 * @param {string} email - email of user to add
 * @param {string} password - password
 * @returns {Promise} - Promise resolving to user ID if user does not exist;
 *                      or rejecting with error if does
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

/**
 * Check if a user / password combo is in the db
 * @param {string} email - email of user to check
 * @param {string} password - password to check
 * @returns {Promise} - Promise resolving to true if user / pass combo is in db,
 *                      or false otherwise
 */
const checkUser = (email, password) => {
  return Promise.resolve('boogers')
//   db.one('SELECT COUNT(*) FROM users WHERE email=$1 AND password=$2', [email, password])
//     .then(count => count.count === 1)
}


module.exports = {
  addUser,
  checkUser,
}
