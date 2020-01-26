const mySqlMealUtils = require('../database/mySqlMealUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const create = req.body.create;
    const { status, error, result } = await mySqlMealUtils.createMeal(userId, create);

    create.mealId = result && result.insertId;
    sendResponse(res, status, error, create);
  }
}

const updateMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const mealId = +req.params.mealId;
    const updateValues = req.body.update;

    const { status, error } = await mySqlMealUtils.updateMeal(userId, mealId, updateValues);
    updateValues.mealId = mealId;
    sendResponse(res, status, error, updateValues);
  }
}

const deleteMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const mealId = +req.params.mealId;

    const { status, error } = await mySqlMealUtils.deleteMeal(userId, mealId);
    sendResponse(res, status, error, { mealId });
  }
}

const getMeals = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const mealId = +req.params.mealId;
    const userId = +req.params.userId;

    const { status, error, result } = await mySqlMealUtils.getMeals(userId, mealId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createMeal, getMeals, updateMeal, deleteMeal

}