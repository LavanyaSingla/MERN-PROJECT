const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
app.use(express.json())

//Router Import
const product = require("./routes/productsRoute");
const user = require("./routes/userRoute");

app.use('/app/v1', product);
app.use('/api/v1', user);

// Middleware

app.use(errorMiddleware);
module.exports = app;