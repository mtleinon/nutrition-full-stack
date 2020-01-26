const mySqlUtils = require('../database/mySqlUsersUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createUser = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const create = req.body.create;
    console.debug('create =', create);
    const { status, error, result } = await mySqlUtils.createUser(create);

    create.userId = result && result.insertId;
    sendResponse(res, status, error, create);
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
  createUser, getUsers, updateUser, deleteUser

}