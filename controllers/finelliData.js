const mySqlFinelliUtils = require('../database/mySqlFinelliUtils');

const getFinelliData = async (req, res, next) => {
  const id = req.params.id;
  const { error, result } = await mySqlFinelliUtils.getFinelliData(id);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(200).send(result);
  }
}

module.exports = {
  getFinelliData
}