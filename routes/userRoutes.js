const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {registerUser} = require('../controllers/users/registerUser');
const {activateUser} = require('../controllers/users/activateUser');
const {loginController} = require('../controllers/users/loginController');

router.post('/register', registerUser);
router.get('/activate/:activationCode', activateUser);
router.post('/login', loginController);

// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

module.exports = router;
