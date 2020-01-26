const mySqlUtils = require('../database/mySqlPlansUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createPlan = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.params.userId;
    const create = req.body.create;

    const { status, error, result } = await mySqlUtils.createPlan(userId, create);
    create.planId = result && result.insertId;
    sendResponse(res, status, error, create);
  }
}

const updatePlan = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const planId = +req.params.planId;
    const updateValues = req.body.update;

    const { status, error } = await mySqlUtils.updatePlan(userId, planId, updateValues);
    updateValues.planId = planId;
    sendResponse(res, status, error, updateValues);
  }
}

const deletePlan = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.params.userId;
    const planId = +req.params.planId;

    const { status, error } = await mySqlUtils.deletePlan(userId, planId);
    sendResponse(res, status, error, { planId });
  }
}

const getPlans = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const planId = +req.params.planId;
    const userId = +req.params.userId;

    const { status, error, result } = await mySqlUtils.getPlans(userId, planId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createPlan, getPlans, updatePlan, deletePlan
}