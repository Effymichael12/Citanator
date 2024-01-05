// ensure dotenv is at the top to handle .env requests
require('dotenv').config();
const express = require('express');
const app = express();
const citeRouter = require('./routes/citationRoutes');
const articleRotuer = require('./routes/articleRoutes');
app.use(express.json())
// protect the api routes with .env
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'citanator.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(process.env.CITEPATH, citeRouter)
app.use(process.env.ARTICLEPATH, articleRotuer)
//protect the port with .env as well
app.listen(process.env.PORT, () => {
  console.log('listening on server');
});
