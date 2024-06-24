const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.loginController = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password }, "requested");

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        // Check if the user's account is active
        if (!user.isActive) return res.status(400).json({ msg: 'Account is not activated' });

        // Compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Create payload for JWT
        const payload = { user: { id: user.id } };

        // Sign token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Prepare user data for response
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
           
        };
        console.log({ token, data: userData })
        // Return token and user data
        res.json({ token, data: userData });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};
