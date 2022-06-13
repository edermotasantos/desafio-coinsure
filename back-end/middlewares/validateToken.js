require('dotenv').config();
const jwt = require('jsonwebtoken');
const { user } = require('../models');
const { UNAUTHORIZED } = require('../schemas/statusCodes');
const { tokenNotFound, invalidToken } = require('../schemas/messages');

const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UNAUTHORIZED).json({ message: tokenNotFound });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { email } = decoded.data;
    const userFound = await user.findOne({ where: { email } });
    if (!user) return res.status(UNAUTHORIZED).json({ message: invalidToken });
    req.user = userFound;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: invalidToken });
  }
};

module.exports = {
  validateToken,
};