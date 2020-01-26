const sqlCommand = require('./sqlCommand');
const MEALS_TABLE = 'meals';

async function getMeals(userId, mealId) {
  let sql;
  let values;
  if (mealId) {
    sql = `SELECT * FROM ${MEALS_TABLE} WHERE ? AND ?`;
    values = [{ mealId }, { userId }];
  } else {
    sql = `SELECT * FROM ${MEALS_TABLE} WHERE ?`;
    values = [{ userId }];
  }

  return await sqlCommand(sql, values);
}

async function createMeal(userId, meal) {

  let sql = `INSERT INTO ${MEALS_TABLE} SET ?`
  let values = meal;

  return await sqlCommand(sql, values);
}

async function updateMeal(userId, mealId, meal) {

  let sql = `UPDATE ${MEALS_TABLE} SET ? WHERE ? AND ?;`
  let values = [meal, { userId }, { mealId }];

  return await sqlCommand(sql, values);
}

async function deleteMeal(userId, mealId) {

  const sql = `DELETE FROM ${MEALS_TABLE} WHERE ? AND ?`;
  let values = [{ userId }, { mealId }];

  return await sqlCommand(sql, values);
}

module.exports = { getMeals, createMeal, updateMeal, deleteMeal };