const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Card = require('../models/card');
const {
  DEFAULT_ERR,
  NOT_FOUND_ERR,
  DATA_ERR,
} = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return Promise.reject(new BadRequest('Переданы некорректные данные при создании карточки.'));
      }
      return Promise.reject(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена.');
    })
    .then(() => res.send({ message: 'Карточка удалена.' }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Карточка с указанным id не найдена.' });
      }
      if (err.name === 'CastError') {
        return res.status(DATA_ERR).send({ message: 'Неверный формат id.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Передан несуществующий id карточки.' });
      }
      if (err.name === 'CastError') {
        return res.status(DATA_ERR).send({ message: 'Неверный формат id.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(NOT_FOUND_ERR).send({ message: 'Передан несуществующий id карточки.' });
      }
      if (err.name === 'CastError') {
        return res.status(DATA_ERR).send({ message: 'Неверный формат id.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};
