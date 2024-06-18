const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { generateActivationCode } = require('../../utils/generateActivationCode');
const { sendActivationEmail } = require('../../utils/sendEmail');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Generate activation code
    const activationCode = generateActivationCode();

    // Create new user with activationCode
    user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      activationCode
    });

    await user.save();

    // Send activation email
    await sendActivationEmail(email, activationCode);

    res.json({ msg: 'User registered. Please check your email to activate your account.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Activate user
exports.activateUser = async (req, res) => {
  const { activationCode } = req.params;

  try {
    // Find user by activation code
    const user = await User.findOne({ activationCode });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid activation code' });
    }

    // Activate user (set isActive to true, clear activationCode)
    user.isActive = true;
    user.activationCode = '';
    await user.save();

    res.json({ msg: 'Account activated successfully' });
  } catch (err) {
    console.error('Error activating user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    if (!user.isActive) return res.status(400).json({ msg: 'Account is not activated' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
