const { Pool } = require('pg')
const login = require('./login.js')

module.exports = new Pool(login)
