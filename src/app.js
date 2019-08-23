const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.use('/user',require('./routes/user'));

app.listen(port, () => console.log(`Server is running on port ${port}.`));