const express = require('express');
const app = express();
const validation = require('./routes/userRoutes');

//middleware
app.use(express.json());

//User POST ROUTE
app.use('/api/v1', validation);

module.exports = app;
