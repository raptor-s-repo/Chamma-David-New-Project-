const bcrypt = require('bcryptjs');
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
      console.log({ name, email, password, activationCode })
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