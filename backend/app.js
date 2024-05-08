const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
app.use(express.json())

//Router Import
const product = require("./routes/productsRoute");

app.use('/app/v1', product);

// Middleware

app.use(errorMiddleware);
module.exports = app;