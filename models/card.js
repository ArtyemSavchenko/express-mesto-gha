const validator = require('validator');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isUrl(String(link)),
      message: 'Неправильный формат ссылки.',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.ObjectId],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
