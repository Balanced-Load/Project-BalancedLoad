const model = require('../model/model.js')

module.exports = {
  getFiveProducts: (req, res) => {
    model.retrieveFiveProducts((err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result.rows);
      }
    })
  },

  getProdDetails: (req, res) => {
    model.retrieveProdDetails(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  },

  getStyles: (req, res) => {
    model.retrieveStyles(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  },

  getRelated: (req, res) => {
    model.retrieveRelated(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    })
  },
}