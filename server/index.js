require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../db/db.js')
const controller = require('./controller/controller.js')

const app = express();
const PORT = 3000;

// app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/products', controller.getFiveProducts);
app.get('/products/:id', controller.getProdDetails);
app.get('/products/:id/styles', controller.getStyles);
app.get('/products/:id/related', controller.getRelated);

app.get('/:file', (req, res) => {
  const file = path.join(__dirname, '..', req.params.file);
  res.sendFile(file);
})

module.exports = app.listen(PORT, () => { console.log(`Listening to port ${PORT}`); });
