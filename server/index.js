const express = require('express');
const path = require('path');
const db = require('../db.js')
const controller = require('../controller/controller.js')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/test', controller.getStyles);

app.listen(PORT, () => { console.log(`Listening to port ${PORT}`); });
