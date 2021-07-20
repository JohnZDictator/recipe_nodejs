const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false},
    () => console.log('db connect')
);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// List your api callbacks and the handler
// app.use('/api/auth', require('./routes/auth/auth'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
