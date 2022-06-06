const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.json('Teste');
})

app.listen(3000);
