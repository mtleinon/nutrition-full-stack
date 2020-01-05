const mySqlMealUtils = require('../database/mySqlMealUtils');
const Meal = require('../models/Meal');
const { validationResult } = require('express-validator');

const createMeal = async (req, res, next) => {
  console.debug('createMeal 1 =');

  const errors = validationResult(req);
  console.debug('createMeal 1 =');
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  console.debug('createMeal 2 =');
  const create = req.body.create;
  console.debug('create =', create);
  const { error, result } = await mySqlMealUtils.createMeal(create);
  console.debug('result =', result);
  if (error) {
    res.status(500).send(error);
  } else {
    create.mealId = result.insertId;
    res.status(200).send(create);
  }
}

const updateMeal = async (req, res, next) => {
  const id = +req.params.id;
  const updateValues = req.body.update;
  console.debug('updateValues =', updateValues);
  const { error, result } = await mySqlMealUtils.updateMeal(id, updateValues);
  if (error) {
    res.status(500).send(error);
  } else {
    console.debug('result =', result);
    updateValues.mealId = id;
    res.status(200).send(updateValues);
  }
}

const deleteMeal = async (req, res, next) => {
  const id = +req.params.id;
  const { status, error, result } = await mySqlMealUtils.deleteMeal(id);
  if (error) {
    res.status(status).send({ error });
  } else {
    res.status(status).send({ mealId: id });
  }
}

const getMeals = async (req, res, next) => {
  const id = req.params.id;
  const { error, result } = await mySqlMealUtils.getMeals(id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(result);
  }
}

module.exports = {
  createMeal, getMeals, updateMeal, deleteMeal

}