const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());

//Router Import
const product = require("./routes/productsRoute");
const user = require("./routes/userRoute");

app.use('/app/v1', product);
app.use('/api/v1', user);

// Middleware

app.use(errorMiddleware);
module.exports = app;