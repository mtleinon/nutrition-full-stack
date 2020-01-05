const sqlCommand = require('./sqlCommand');
const PLANS_TABLE = 'plans';

async function get(table, id) {
  let sql = `SELECT * FROM ${table}`;
  let values;
  if (id) {
    sql = `SELECT * FROM ${table} WHERE ?`;
    values = table === 'plans' ? [{ planId: id }] : [{ mealId: id }];
  }
  // console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  // console.debug('get result =', result);
  return result;
}

async function getPlans(id) {
  let sql = `SELECT * FROM ${PLANS_TABLE}`;
  let values;
  if (id) {
    sql = `SELECT * FROM ${PLANS_TABLE} WHERE ?`;
    values = [{ planId: id }];
  }
  // console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  // console.debug('get result =', result);
  return result;
}

async function add(table, name, description, planId) {
  let sql = `INSERT INTO ${table} SET ?`
  let values = { name, description, planId };
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function createPlan(plan) {
  let sql = `INSERT INTO ${PLANS_TABLE} SET ?`
  let values = plan;
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function updatePlan(id, plan) {
  let sql = `UPDATE ${PLANS_TABLE} SET ? WHERE planId=?;`
  let values = [plan, id];
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function update(table, id, name, description, planId) {

  let sql = `UPDATE ${table} SET ? WHERE ?;`;

  const whereCondition = table === 'plans' ? { planId: id } : { mealId: id };

  const updatedValues = {};
  if (name) updatedValues.name = name;
  if (description) updatedValues.description = description;
  if (planId) updatedValues.planId = planId;

  let values = [updatedValues, whereCondition];

  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  console.debug('update result =', result);
  return result;
}

async function deletePlan(id) {
  const sql = `delete FROM ${PLANS_TABLE} WHERE planId = ?`;

  const result = await sqlCommand(sql, id);
  return result;
}
async function deleteRow(table, id) {
  const sql = `delete FROM ${table} WHERE ?`;

  const values = table === 'plans' ? { planId: id } : { mealId: id };

  const result = await sqlCommand(sql, values);
  return result;
}

module.exports = { getPlans, createPlan, updatePlan, deletePlan };