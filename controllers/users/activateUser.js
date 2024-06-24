
const User = require('../../models/User');

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
  