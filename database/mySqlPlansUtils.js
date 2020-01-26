const sqlCommand = require('./sqlCommand');
const PLANS_TABLE = 'plans';

async function getPlans(userId, planId) {

  let sql;
  let values;
  if (planId) {
    sql = `SELECT * FROM ${PLANS_TABLE} WHERE ? AND ?`;
    values = [{ planId }, { userId }];
  } else {
    sql = `SELECT * FROM ${PLANS_TABLE} WHERE ?`;
    values = [{ userId }];
  }

  return await sqlCommand(sql, values);
}

async function createPlan(userId, plan) {

  let sql = `INSERT INTO ${PLANS_TABLE} SET ?`
  let values = plan;

  return await sqlCommand(sql, values);
}

async function updatePlan(userId, planId, plan) {

  let sql = `UPDATE ${PLANS_TABLE} SET ? WHERE userId=? AND planId=?;`
  let values = [plan, userId, planId];

  return await sqlCommand(sql, values);
}

async function deletePlan(userId, planId) {

  const sql = `DELETE FROM ${PLANS_TABLE} WHERE userId=? AND planId=?`;
  let values = [userId, planId];

  return await sqlCommand(sql, values);
}

module.exports = { getPlans, createPlan, updatePlan, deletePlan };