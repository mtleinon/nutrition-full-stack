const mySqlUtils = require('../database/mySqlPlansUtils');
const { checkRequest, sendResponse } = require('./controllerUtils');

const createPlan = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const newPlan = req.body.newPlan;
    newPlan.userId = userId;
    const { status, error, result } =
      await mySqlUtils.createPlan(userId, newPlan);
    newPlan.planId = result && result.insertId;
    sendResponse(res, status, error, newPlan);
  }
}

const updatePlan = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const planId = +req.params.planId;
    const plan = req.body.plan;
    plan.userId = userId;

    const { status, error } = await mySqlUtils.updatePlan(userId, planId, plan);
    plan.planId = planId;
    sendResponse(res, status, error, plan);
  }
}

const deletePlan = async (req, res, _) => {

  if (checkRequest(req, res)) {

    const userId = +req.user.userId;
    const planId = +req.params.planId;

    const { status, error } = await mySqlUtils.deletePlan(userId, planId);
    sendResponse(res, status, error, { planId });
  }
}

const getPlans = async (req, res, _) => {

  if (checkRequest(req, res)) {
    const userId = +req.user.userId;
    const planId = +req.params.planId;

    const { status, error, result } = await mySqlUtils.getPlans(userId, planId);
    sendResponse(res, status, error, result);
  }
}

module.exports = {
  createPlan, getPlans, updatePlan, deletePlan
}