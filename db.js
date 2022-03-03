const { Pool, Client } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: process.env.USER,
  database: 'postgres',
})

const retrieveStyles = (callback) => {
  pool.query('select * from styles where productID = 1', callback)
}
// pool.end()

module.exports = {
  retrieveStyles,
}