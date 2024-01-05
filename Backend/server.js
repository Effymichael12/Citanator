// ensure dotenv is at the top to handle .env requests
require('dotenv').config();
const express = require('express');
const app = express();
const citeRouter = require('./routes/citationRoutes');
const articleRotuer = require('./routes/articleRoutes');
app.use(express.json())
// protect the api routes with .env
app.use(process.env.CITEPATH, citeRouter)
app.use(process.env.ARTICLEPATH, articleRotuer)
//protect the port with .env as well
app.listen(process.env.PORT, () => {
  console.log('listening on server');
});
