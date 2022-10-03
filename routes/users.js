const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const validateId = require('../middlewares/validateId');
const validateUpdatingAvatar = require('../middlewares/validateUpdatingAvatar');
const validateUpdatingUser = require('../middlewares/validateUpdatingUser');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validateId, getUserById);
router.patch('/me', validateUpdatingUser, updateUser);
router.patch('/me/avatar', validateUpdatingAvatar, updateAvatar);

module.exports = router;
