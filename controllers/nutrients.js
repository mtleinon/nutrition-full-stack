const mySqlNutrientUtils = require('../database/mySqlNutrientUtils');
const Nutrient = require('../models/Nutrient');
const { validationResult } = require('express-validator');

const createNutrient = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const create = req.body.create;
  const { error, result } = await mySqlNutrientUtils.createNutrient(create);
  if (error) {
    res.status(500).send(error);
  } else {
    create.nutrientId = result.insertId;
    res.status(200).send(create);
  }
}

const updateNutrient = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const id = +req.params.id;
  const updateValues = req.body.update;
  console.debug('updateValues =', updateValues);
  const { error, result } = await mySqlNutrientUtils.updateNutrient(id, updateValues);
  if (error) {
    res.status(500).send(error);
  } else {
    console.debug('result =', result);
    updateValues.nutrientId = id;
    res.status(200).send(updateValues);
  }
}

const deleteNutrient = async (req, res, next) => {
  const id = +req.params.id;
  const { status, error, result } = await mySqlNutrientUtils.deleteNutrient(id);
  if (error) {
    res.status(status).send({ error });
  } else {
    res.status(status).send({ nutrientId: id });
  }
}

const getNutrients = async (req, res, next) => {
  const id = req.params.id;
  const { error, result } = await mySqlNutrientUtils.getNutrients(id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(result);
  }
}

module.exports = {
  createNutrient, getNutrients, updateNutrient, deleteNutrient

}