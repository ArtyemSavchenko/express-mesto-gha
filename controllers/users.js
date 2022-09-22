const User = require('../models/user');
const {
  DEFAULT_ERR,
  NOT_FOUND_ERR,
  DATA_ERR,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Пользователь по указанному id не найден.' });
      }
      if (err.name === 'CastError') {
        return res.status(DATA_ERR).send({ message: 'Неверный формат id.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Пользователь c указанным id не найден.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERR).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Пользователь c указанным id не найден.' });
      }
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERR).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};
