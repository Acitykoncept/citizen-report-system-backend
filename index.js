const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const mongoose = require('mongoose');
const express = require('express');
const reportRouter = require('./routes/reportRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', reportRouter);

const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

app.listen(PORT, () => {
  console.log('App running on port', PORT);
});
