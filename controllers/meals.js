const mySqlMealUtils = require('../database/mySqlMealUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const newMeal = req.body.newMeal;
    newMeal.userId = userId;
    const { status, error, result } = await mySqlMealUtils.createMeal(userId, newMeal);

    newMeal.mealId = result && result.insertId;
    sendResponse(res, status, error, newMeal);
  }
}

const updateMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const mealId = +req.params.mealId;
    const meal = req.body.meal;
    meal.userId = userId;

    const { status, error } = await mySqlMealUtils.updateMeal(userId, mealId, meal);
    meal.mealId = mealId;
    sendResponse(res, status, error, meal);
  }
}

const deleteMeal = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const mealId = +req.params.mealId;

    const { status, error } = await mySqlMealUtils.deleteMeal(userId, mealId);
    sendResponse(res, status, error, { mealId });
  }
}

const getMeals = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const mealId = +req.params.mealId;

    const { status, error, result } = await mySqlMealUtils.getMeals(userId, mealId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createMeal, getMeals, updateMeal, deleteMeal

}