const db = require('../db/db.js')

module.exports = {
  getFiveProducts: (req, res) => {
    db.retrieveFiveProducts((err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(result.rows);
      }
    })
  },

  getProdDetails: (req, res) => {
    // console.log(req.params.id)
    db.retrieveProdDetails(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  },

  getStyles: (req, res) => {
    db.retrieveStyles(req.params.id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    })
  },

  getRelated: (req, res) => {
    db.retrieveRelated(req.params.id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(result);
      }
    })
  },
}