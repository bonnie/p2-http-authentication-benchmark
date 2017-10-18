const chai = require('chai')
const { db } = require('../db/db_connection')
const { addUser, checkUser } = require('../db/db_utilities.js')
const { initDB, seedUsername, seedPassword } = require('./db/db_test_util.js')

const expect = chai.expect

describe('addUser() when user does not exist', () => {
  const email = 'new@new'
  const pass = 'new'
  let addPromise
  beforeEach('reset the database', (done) => {
    addPromise = initDB()
      .then(() => addUser(email, pass))
      .then(id =>
        db.one('SELECT * FROM users WHERE user_id = $1', id),
      )
    done()
  })
  it('adds user when user does not exist', () =>
    addPromise.then(user =>
      expect(user.email).to.equal(email),
    ),
  )
  it('adds user when user does not exist', () =>
    addPromise.then(user =>
      expect(user.password).to.equal(pass),
    ),
  )
})

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
describe('addUser when user does exist', () => {
  beforeEach('initialize db', () => initDB())
  it('throws an error when user does exist', () =>
    expect(addUser(seedUsername, seedPassword))
      .to.eventually.be
      .rejectedWith(`User ${seedUsername} already exists`),
  )
})

describe('checkUser', () => {
  beforeEach('initialize db', () => initDB())
  it('returns true when user / pass exists', () =>
    expect(checkUser(seedUsername, seedPassword)).to.eventually.equal(true),
  )
  it('returns false when user exists and password is wrong', () =>
    expect(checkUser(seedUsername, 'boogers')).to.eventually.equal(false),
  )
  it('returns false when user does not exist', () =>
    expect(checkUser('bob@bob.com', seedPassword)).to.eventually.equal(false),
  )
})
