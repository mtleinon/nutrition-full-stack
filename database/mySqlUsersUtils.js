const sqlCommand = require('./sqlCommand');
const USERS_TABLE = 'users';

async function getUsers(userId) {
  let sql;
  let values;
  if (userId) {
    sql = `SELECT * FROM ${USERS_TABLE} WHERE ?`;
    values = [{ userId }];
  } else {
    sql = `SELECT * FROM ${USERS_TABLE}`;
  }
  console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  console.debug('get result =', result);
  return result;
}

async function createUser(user) {
  let sql = `INSERT INTO ${USERS_TABLE} SET ?`
  let values = user;
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function updateUser(userId, user) {
  let sql = `UPDATE ${USERS_TABLE} SET ? WHERE userId=?;`
  let values = [user, userId];
  console.debug('values =', values);
  const result = await sqlCommand(sql, values);
  return result;
}

async function deleteUser(id) {
  const sql = `delete FROM ${USERS_TABLE} WHERE userId = ?`;

  const result = await sqlCommand(sql, id);
  return result;
}

module.exports = { getUsers, createUser, updateUser, deleteUser };