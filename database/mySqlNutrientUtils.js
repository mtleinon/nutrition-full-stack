const sqlCommand = require('./sqlCommand');
const NUTRIENTS_TABLE = 'nutrients';

async function getNutrients(userId, nutrientId) {

  let sql;
  let values;
  if (nutrientId) {
    sql = `SELECT * FROM ${NUTRIENTS_TABLE} WHERE ? AND ?`;
    values = [{ userId }, { nutrientId }];
  } else {
    sql = `SELECT * FROM ${NUTRIENTS_TABLE} WHERE ?`;
    values = [{ userId }];
  }

  return await sqlCommand(sql, values);
}

async function createNutrient(userId, nutrient) {

  let sql = `INSERT INTO ${NUTRIENTS_TABLE} SET ?`
  let values = nutrient;
  return await sqlCommand(sql, values);
}

async function updateNutrient(userId, nutrientId, nutrient) {

  let sql = `UPDATE ${NUTRIENTS_TABLE} SET ? WHERE ? AND ?;`
  let values = [nutrient, { userId }, { nutrientId }];

  const result = await sqlCommand(sql, values);
  return result;
}

async function deleteNutrient(userId, nutrientId) {

  const sql = `delete FROM ${NUTRIENTS_TABLE} WHERE ? AND ?`;
  let values = [{ userId }, { nutrientId }];

  const result = await sqlCommand(sql, values);
  return result;
}

module.exports = { getNutrients, createNutrient, updateNutrient, deleteNutrient };