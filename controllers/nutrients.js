const mySqlNutrientUtils = require('../database/mySqlNutrientUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const create = req.body.create;
    const { status, error, result } = await mySqlNutrientUtils.createNutrient(userId, create);

    create.nutrientId = result && result.insertId;
    sendResponse(res, status, error, create);
  }
}

const updateNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const nutrientId = +req.params.nutrientId;
    const updateValues = req.body.update;
    const { status, error } = await mySqlNutrientUtils.updateNutrient(userId, nutrientId, updateValues);

    updateValues.nutrientId = nutrientId;
    sendResponse(res, status, error, updateValues);
  }
}

const deleteNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const nutrientId = +req.params.nutrientId;

    const { status, error } =
      await mySqlNutrientUtils.deleteNutrient(userId, nutrientId);
    sendResponse(res, status, error, { nutrientId });
  }
}

const getNutrients = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const nutrientId = req.params.nutrientId;
    const { status, error, result } = await mySqlNutrientUtils.getNutrients(userId, nutrientId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createNutrient, getNutrients, updateNutrient, deleteNutrient
}