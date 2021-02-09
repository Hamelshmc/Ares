const compression = require('compression');
const cors = require('cors');
const express = require('express');
const { router } = require('./routes');

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/api/v1/', router);

app.all('*', (req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = 'Endpoint Not Found';
  next(err);
});

module.exports = { app };
