const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const validateLogin = require('./middlewares/validateLogin');
const validateRegistration = require('./middlewares/validateRegistration');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegistration, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не существует.' });
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .send({ message: err.message });

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${PORT}`);
});
