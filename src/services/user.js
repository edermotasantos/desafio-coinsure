const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  nameLength,
  passwordLength,
  emailIsRequired,
  passwordIsRequired,
  displayNameIsRequired,
  invalidEmail,
  emailEmpty,
  passwordEmpty,
  invalidFields,
  userAlreadyExists,
  userDoesntExist,
} = require('../schemas/messages');

const { BAD_REQUEST, NOT_FOUND, CONFLICT } = require('../schemas/statusCodes');

const createToken = (user, email) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const { id } = user;
  const data = { id, email };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const validateNameLength = (displayName) => {
  if (displayName.length < 8) {
    return { err: { statusCode: BAD_REQUEST, message: nameLength } };
  }
};

const validatePasswordLength = (password) => {
  if (password.length !== 6) {
    return { err: { statusCode: BAD_REQUEST, message: passwordLength } };
  }
};

const validateUserData = async (email, password, displayName) => {
  if (!email) return { err: { statusCode: BAD_REQUEST, message: emailIsRequired } };
  if (!password) return { err: { statusCode: BAD_REQUEST, message: passwordIsRequired } };
  if (!displayName) return { err: { statusCode: BAD_REQUEST, message: displayNameIsRequired } };
  const validEmail = /[\w\d.+_-]+@[\w]+.com/;
  if (!validEmail.test(email)) {
    return { err: { statusCode: BAD_REQUEST, message: invalidEmail } };
  }
};

const createUser = async ({ email, password, displayName, image }) => {
  const userData = await validateUserData(email, password, displayName);
  if (userData) return userData;
  const checkNameLength = validateNameLength(displayName);
  if (checkNameLength) return checkNameLength;
  const checkPasswordLength = validatePasswordLength(password); 
  if (checkPasswordLength) return checkPasswordLength;

  const emailAlreadyExists = await User.findOne({ where: { email } });
  console.log(emailAlreadyExists);
  if (emailAlreadyExists) return { err: { statusCode: CONFLICT, message: userAlreadyExists } };
  const user = await User.create({ email, password, displayName, image });
  const token = createToken(user, email);
  return { token };
};

const validateLoginData = (email, password) => {
  if (email === '') return { err: { statusCode: BAD_REQUEST, message: emailEmpty } };
  if (password === '') return { err: { statusCode: BAD_REQUEST, message: passwordEmpty } };
  if (!email) return { err: { statusCode: BAD_REQUEST, message: emailIsRequired } };
  if (!password) return { err: { statusCode: BAD_REQUEST, message: passwordIsRequired } };
};

const existentUser = (user, password) => {
  if (!user || user.password !== password) {
    return { err: { statusCode: BAD_REQUEST, message: invalidFields } };
  }
};

const login = async ({ email, password }) => {
  const loginData = validateLoginData(email, password);
  if (loginData) return loginData;
  const user = await User.findOne({ where: { email } });
  const nonExistentUser = existentUser(user, password);
  if (nonExistentUser) return nonExistentUser;
  const token = createToken(user, email);
  return { token };
};

const listAllUsers = async () => {
  const usersFound = User.findAll({ raw: true });
  return usersFound;
};

const listUserById = async (id) => {
  const foundUserById = await User.findByPk(id, { raw: true });
  if (!foundUserById) {
    return { err: { statusCode: NOT_FOUND, message: userDoesntExist } };
  }
  return foundUserById;
};

module.exports = {
  createUser,
  login,
  listAllUsers,
  listUserById,
};
