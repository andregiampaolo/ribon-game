const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connect to db')
);

app.listen(port, () => console.log(`Server is running on port ${port}.`));