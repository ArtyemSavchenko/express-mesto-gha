const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63296068cb76f31896083eea'
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не существует.' });
});

app.listen(PORT, () => {
  console.log('App started on port ' + PORT);
});
