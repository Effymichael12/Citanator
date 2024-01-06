// ensure dotenv is at the top to handle .env requests
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const citeRouter = require('./routes/citationRoutes');
const articleRotuer = require('./routes/articleRoutes');
const app = express();
const corsOpts = {
origin:'*',
  credentials: true,
  methods: [GET, POST, PATCH, DELETE],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));
app.use(express.json())
// protect the api routes with .env
app.use(process.env.CITEPATH, citeRouter)
app.use(process.env.ARTICLEPATH, articleRotuer)
//protect the port with .env as well
app.listen(process.env.PORT, () => {
  console.log('listening on server');
});
