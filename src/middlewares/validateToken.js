require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UNAUTHORIZED } = require('../schemas/statusCodes');
const { tokenNotFound, invalidToken } = require('../schemas/messages');

const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: tokenNotFound });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { email } = decoded.data;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(UNAUTHORIZED).json({ message: invalidToken });
    req.user = user;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: invalidToken });
  }
};

module.exports = {
  validateToken,
};