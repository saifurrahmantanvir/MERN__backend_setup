const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  res
    .status(200)
    .json({ status: true, message: 'Server running successfully!' });
});

module.exports = app;
