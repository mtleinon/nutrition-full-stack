const sqlCommand = require('./sqlCommand');
const NUTRIENTS_TABLE = 'nutrients';

async function getNutrients(id) {
  let sql = `SELECT * FROM ${NUTRIENTS_TABLE}`;
  let values;
  if (id) {
    sql = `SELECT * FROM ${NUTRIENTS_TABLE} WHERE ?`;
    values = [{ nutrientId: id }];
  }
  // console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  // console.debug('get result =', result);
  return result;
}

async function createNutrient(nutrient) {
  let sql = `INSERT INTO ${NUTRIENTS_TABLE} SET ?`
  let values = nutrient;
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function updateNutrient(id, nutrient) {
  let sql = `UPDATE ${NUTRIENTS_TABLE} SET ? WHERE nutrientId=?;`
  let values = [nutrient, id];
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function deleteNutrient(id) {
  const sql = `delete FROM ${NUTRIENTS_TABLE} WHERE nutrientId = ?`;

  const result = await sqlCommand(sql, id);
  return result;
}

module.exports = { getNutrients, createNutrient, updateNutrient, deleteNutrient };