const mySqlUtils = require('../database/mySqlUsersUtils');
const { validationResult } = require('express-validator');

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const create = req.body.create;
  console.debug('create =', create);
  const { error, result } = await mySqlUtils.createUser(create);
  console.debug('result =', result);
  if (error) {
    res.status(500).send(error);
  } else {
    create.userId = result.insertId;
    res.status(200).send(create);
  }
}

const updateUser = async (req, res, next) => {
  const id = +req.params.id;
  const updateValues = req.body.update;
  console.debug('updateValues =', updateValues);
  const { error, result } = await mySqlUtils.updateUser(id, updateValues);
  if (error) {
    res.status(500).send(error);
  } else {
    console.debug('result =', result);
    updateValues.userId = id;
    res.status(200).send(updateValues);
  }
}

const deleteUser = async (req, res, next) => {
  const id = +req.params.id;
  const { status, error, result } = await mySqlUtils.deleteUser(id);
  if (error) {
    res.status(status).send({ error });
  } else {
    res.status(status).send({ userId: id });
  }
}

const getUsers = async (req, res, next) => {
  const id = req.params.id;
  const { error, result } = await mySqlUtils.getUsers(id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(result);
  }
}

module.exports = {
  createUser, getUsers, updateUser, deleteUser

}