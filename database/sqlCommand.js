const mysql = require('mysql');
const util = require('util');
const INTERNAL_SERVER_ERROR = 'Internal server error happened';
const CONTENT_NOT_FOUND = 'Content not found';

//TODO: take connection pool into use 
console.debug('process.env.NODE_ENV =', process.env.NODE_ENV);
let mySqlConfig;
if (process.env.NODE_ENV === 'development') {
  mySqlConfig = require('../config/mySqlConfig.js');
  const mySqlPassword = require('../secrets/secrets').mySqlPassword;

  mySqlConfig.password = mySqlPassword;
  console.debug('development mySqlConfig =', mySqlConfig);
} else {
  mySqlConfig = require('../config/mySqlConfigHeroku');
  mySqlConfig.user = process.env.MYSQL_USER;
  mySqlConfig.password = process.env.MYSQL_PASSWORD;
  console.debug('production mySqlConfig =', mySqlConfig);
}

async function sqlCommand(sqlCommand, values) {
  // console.debug('sqlCommand =', sqlCommand);
  const result = { status: undefined, error: undefined, result: undefined };
  const connection = mysql.createConnection(mySqlConfig);
  const query = util.promisify(connection.query).bind(connection);
  try {
    result.result = await query(
      sqlCommand,
      values);
    if ((sqlCommand.indexOf('UPDATE') === 0
      || sqlCommand.indexOf('DELETE') === 0) && result.result.affectedRows === 0) {
      result.status = 404;
      result.error = CONTENT_NOT_FOUND;
    } else {
      result.status = 200;
    }
  } catch (err) {
    console.error('MySQL err.code:', err.code);
    console.error('MySQL err.errno:', err.errno);
    console.error('MySQL err.fatal:', err.fatal);
    console.error('MySQL err.sql:', err.sql);
    console.error('MySQL err.sqlState:', err.sqlState);
    console.error('MySQL err.sqlMessage:', err.sqlMessage);
    if (err.errno === 1451 || err.errno === 1452) {
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
  // console.debug('sqlCommand result =', result);
  return result;
}

module.exports = sqlCommand;
