const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then(() => res.status(200).send({ message: "Карточка удалена" }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};