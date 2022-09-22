const Card = require('../models/card');
const {
  DEFAULT_ERR,
  NOT_FOUND_ERR,
  DATA_ERR,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(DATA_ERR).send({ message: ' Переданы некорректные данные при создании карточки.' });
      }
      return res.status(DEFAULT_ERR).send({ message: 'Что-то пошло не так.' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
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
