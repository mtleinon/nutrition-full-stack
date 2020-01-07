const sqlCommand = require('./sqlCommand');
const FINELLI_TABLE = 'finelli';

async function getFinelliData(id) {
  let sql = `SELECT * FROM ${FINELLI_TABLE}`;
  let values;
  if (id) {
    sql = `SELECT * FROM ${FINELLI_TABLE} WHERE ?`;
    values = [{ finelliId: id }];
  }
  // console.debug('sql, values =', sql, values);
  const result = await sqlCommand(sql, values);
  // console.debug('get result =', result);
  return result;
}

module.exports = { getFinelliData };