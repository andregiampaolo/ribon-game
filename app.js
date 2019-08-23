const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connect to db')
);

app.listen(port, () => console.log(`Server is running on port ${port}.`));