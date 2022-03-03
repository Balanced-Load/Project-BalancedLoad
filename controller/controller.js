const db = require('../db.js')

module.exports = {
  getStyles: (req, res) => {
    db.retrieveStyles((err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    })
  }
}