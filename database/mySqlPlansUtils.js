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
  console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  console.debug('get result =', result);
  return result;
}

async function createPlan(plan) {
  let sql = `INSERT INTO ${PLANS_TABLE} SET ?`
  let values = plan;
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function updatePlan(planId, plan) {
  let sql = `UPDATE ${PLANS_TABLE} SET ? WHERE planId=?;`
  let values = [plan, planId];
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function deletePlan(id) {
  const sql = `delete FROM ${PLANS_TABLE} WHERE planId = ?`;

  const result = await sqlCommand(sql, id);
  return result;
}

module.exports = { getPlans, createPlan, updatePlan, deletePlan };