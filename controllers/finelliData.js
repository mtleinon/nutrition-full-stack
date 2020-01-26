const mySqlFinelliUtils = require('../database/mySqlFinelliUtils');
const { sendResponse } = require('./controllerUtils');

const getFinelliData = async (req, res, next) => {
  const finelliId = req.params.finelliId;
  const { status, error, result } = await mySqlFinelliUtils.getFinelliData(finelliId);

  sendResponse(res, status, error, result);
}

module.exports = {
  getFinelliData
}