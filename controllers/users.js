const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jsonSecret = require('../secrets/finelliConfig').jsonSecret;
const mySqlUtils = require('../database/mySqlUsersUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createUser = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const newUser = req.body.newUser;
    console.debug('newUser =', newUser);

    //TODO: Check that email isn't created to database already

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, async (err, hash) => {

        if (err) throw err;
        newUser.password = hash;

        const { status, error, result } = await mySqlUtils.createUser(newUser);

        newUser.userId = result && result.insertId;
        sendResponse(res, status, error, newUser);
      });
    });
  }
}


// Authenticate user. If it succeeds return JWT

const loginUser = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const user = req.body.user;
    const { status, error, result } = await mySqlUtils.getUsers(undefined, user.email);

    if (result && result.length === 1) {
      const userData = result[0];
      bcrypt.compare(user.password, userData.password, (err, result) => {
        if (err) throw err;
        if (result) {
          userData.password = '';
          token = jwt.sign({
            data: {
              userId: userData.userId,
              email: userData.email,
              name: userData.name
            }
          }, jsonSecret, { expiresIn: '8h' });
          return sendResponse(res, status, error, {
            userData,
            token: 'bearer ' + token
          });
        }
        return sendResponse(res, 404, { error: 'Password is erroneous' });
      });
    } else {
      sendResponse(res, 404, { error: 'Unknown user' });
    }
  }
}

const updateUser = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const updateValues = req.body.update;

    const { status, error } = await mySqlUtils.updateUser(userId, updateValues);

    updateValues.userId = userId;
    sendResponse(res, status, error, updateValues);
  }
}

const deleteUser = async (req, res, _) => {
  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const { status, error } = await mySqlUtils.deleteUser(userId);
    sendResponse(res, status, error, { userId });
  }
}

const getUsers = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = req.params.userId;
    const email = req.params.email;
    const password = req.params.password;

    const { status, error, result } = await mySqlUtils.getUsers(userId, email, password);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createUser, loginUser, getUsers, updateUser, deleteUser

}