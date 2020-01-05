const mysql = require('mysql');
const config = require('../secrets/finelliConfig.js');
const util = require('util');
const INTERNAL_SERVER_ERROR = 'Internal server error happened';

async function sqlCommand(sqlCommand, values) {
  // console.debug('sqlCommand =', sqlCommand);
  const result = { result: undefined, error: undefined };
  const connection = mysql.createConnection(config);
  const query = util.promisify(connection.query).bind(connection);
  try {
    result.result = await query(
      sqlCommand,
      values)
    result.status = 200;
  } catch (err) {
    console.error('MySQL err.code:', err.code);
    console.error('MySQL err.errno:', err.errno);
    console.error('MySQL err.fatal:', err.fatal);
    console.error('MySQL err.sql:', err.sql);
    console.error('MySQL err.sqlState:', err.sqlState);
    console.error('MySQL err.sqlMessage:', err.sqlMessage);
    if (err.errno === 1451) {
      result.status = 422;
      result.error = err.sqlMessage;
    } else {
      result.status = 500;
      result.error = INTERNAL_SERVER_ERROR;
    }
  } finally {
    connection.end(function (err) {
      if (err) {
        console.error('MySQL connection.end err:', err);
      }
    });
  }
  return result;
}

module.exports = sqlCommand;
