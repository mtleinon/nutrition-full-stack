const sqlCommand = require('./sqlCommand');
const MEALS_TABLE = 'meals';

async function getMeals(id) {
  let sql = `SELECT * FROM ${MEALS_TABLE}`;
  let values;
  if (id) {
    sql = `SELECT * FROM ${MEALS_TABLE} WHERE ?`;
    values = [{ mealId: id }];
  }
  // console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  // console.debug('get result =', result);
  return result;
}

async function createMeal(meal) {
  let sql = `INSERT INTO ${MEALS_TABLE} SET ?`
  let values = meal;
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function updateMeal(id, meal) {
  let sql = `UPDATE ${MEALS_TABLE} SET ? WHERE mealId=?;`
  let values = [meal, id];
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function deleteMeal(id) {
  const sql = `delete FROM ${MEALS_TABLE} WHERE mealId = ?`;

  const result = await sqlCommand(sql, id);
  return result;
}

module.exports = { getMeals, createMeal, updateMeal, deleteMeal };