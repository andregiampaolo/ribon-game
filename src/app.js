const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();
app.user(bodyParser.json());

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connect to db')
);

app.listen(port, () => console.log(`Server is running on port ${port}.`));