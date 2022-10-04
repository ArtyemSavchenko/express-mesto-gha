const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateRegistration } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Страница не существует.'));
});

module.exports = router;
