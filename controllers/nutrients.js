const mySqlNutrientUtils = require('../database/mySqlNutrientUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const newNutrient = req.body.newNutrient;
    newNutrient.userId = userId;
    const { status, error, result } = await mySqlNutrientUtils.createNutrient(userId, newNutrient);

    newNutrient.nutrientId = result && result.insertId;
    sendResponse(res, status, error, newNutrient);
  }
}

const updateNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const nutrientId = +req.params.nutrientId;
    const nutrient = req.body.nutrient;
    nutrient.userId = userId;
    const { status, error } = await mySqlNutrientUtils.updateNutrient(userId, nutrientId, nutrient);

    nutrient.nutrientId = nutrientId;
    sendResponse(res, status, error, nutrient);
  }
}

const deleteNutrient = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const nutrientId = +req.params.nutrientId;

    const { status, error } =
      await mySqlNutrientUtils.deleteNutrient(userId, nutrientId);
    sendResponse(res, status, error, { nutrientId });
  }
}

const getNutrients = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const nutrientId = req.params.nutrientId;
    const { status, error, result } = await mySqlNutrientUtils.getNutrients(userId, nutrientId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createNutrient, getNutrients, updateNutrient, deleteNutrient
}