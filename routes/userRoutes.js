const router = require('express').Router();
const User = require('../controllers/user');

const { validateToken } = require('../middlewares/validateToken');

router.post('/', User.createUser);
router.get('/', validateToken, User.listAllUsers);
router.get('/:id', validateToken, User.listUserById);

module.exports = router;