const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user = require('../models/user.js');

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await user.findOne({
      where: {
        mail: email,
        password: password
      }
    });

    if (!userData) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
        const userToken = userData.dataValues;
        const token = jwt.sign(
          userToken,
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        const data = {
            userData: userData.dataValues,
            token: token
        }
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const signup = async (req, res) => {
  const { name, mail, password } = req.body;

  try {
    const existingUser = await user.findOne({ where: { mail } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = await user.create({ name, mail, password });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 

exports = {
  login,
  signup
};