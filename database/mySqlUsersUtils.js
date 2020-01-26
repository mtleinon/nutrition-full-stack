const sqlCommand = require('./sqlCommand');
const USERS_TABLE = 'users';

async function getUsers(userId, email, password) {

  let sql;
  let values;
  if (email) {
    sql = `SELECT * FROM ${USERS_TABLE} WHERE ?`;
    values = [{ email }];
  } else if (email && password) {
    sql = `SELECT * FROM ${USERS_TABLE} WHERE ?`;
    values = [{ email }, { password }];
  } else if (userId) {
    sql = `SELECT * FROM ${USERS_TABLE} WHERE ?`;
    values = [{ userId }];
  } else {
    sql = `SELECT * FROM ${USERS_TABLE}`;
  }

  return await sqlCommand(sql, values);
}

async function createUser(user) {

  let sql = `INSERT INTO ${USERS_TABLE} SET ?`
  let values = user;
  return await sqlCommand(sql, values);
}

async function updateUser(userId, user) {

  let sql = `UPDATE ${USERS_TABLE} SET ? WHERE userId=?;`
  let values = [user, userId];
  return await sqlCommand(sql, values);
}

async function deleteUser(id) {
  const sql = `DELETE FROM ${USERS_TABLE} WHERE userId = ?`;

  return await sqlCommand(sql, id);
}

module.exports = { getUsers, createUser, updateUser, deleteUser };