const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
    () => console.log('db connect')
);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// List your api callbacks and the handler
// app.use('/api/auth', require('./routes/auth/auth'));

app.use('/api/auth', require('./routes/auth/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/role', require('./routes/api/role'));
app.use('/api/recipe', require('./routes/api/recipe'));
app.use('/api/ingredient', require('./routes/api/ingredient'));
app.use('/api/step', require('./routes/api/step'));
app.use('/api/like', require('./routes/api/like'));
app.use('/api/subscribe', require('./routes/api/subscribe'));
app.use('/api/save', require('./routes/api/save'));

app.use('/api/admin', require('./routes/api/admin'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
