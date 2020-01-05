const mySqlUtils = require('../database/mySqlUtils');
const Plan = require('../models/Plan');
const { validationResult } = require('express-validator');

const createPlan = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const create = req.body.create;
  console.debug('create =', create);
  const { error, result } = await mySqlUtils.createPlan(create);
  console.debug('result =', result);
  if (error) {
    res.status(500).send(error);
  } else {
    create.planId = result.insertId;
    res.status(200).send(create);
  }
}

const updatePlan = async (req, res, next) => {
  const id = +req.params.id;
  const updateValues = req.body.update;
  console.debug('updateValues =', updateValues);
  const { error, result } = await mySqlUtils.updatePlan(id, updateValues);
  if (error) {
    res.status(500).send(error);
  } else {
    console.debug('result =', result);
    updateValues.planId = id;
    res.status(200).send(updateValues);
  }
}

const deletePlan = async (req, res, next) => {
  const id = +req.params.id;
  const { status, error, result } = await mySqlUtils.deletePlan(id);
  if (error) {
    res.status(status).send({ error });
  } else {
    res.status(status).send({ planId: id });
  }
}

const getPlans = async (req, res, next) => {
  const id = req.params.id;
  const { error, result } = await mySqlUtils.getPlans(id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(result);
  }
}

module.exports = {
  createPlan, getPlans, updatePlan, deletePlan

}