const sqlCommand = require('./sqlCommand');
const FINELLI_TABLE = 'finelli';

async function getFinelliData(finelliId) {
  let sql = `SELECT * FROM ${FINELLI_TABLE}`;
  let values;
  if (finelliId) {
    sql = `SELECT * FROM ${FINELLI_TABLE} WHERE ?`;
    values = [{ finelliId }];
  }
  return await sqlCommand(sql, values);
}

module.exports = { getFinelliData };