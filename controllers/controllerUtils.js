const { validationResult } = require('express-validator');

const checkRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return false;
  }
  return true;
}

const sendResponse = (res, status, error, result) => {
  if (error) {
    res.status(status).send(error);
  } else {
    res.status(status).send(result);
  }
}


module.exports = {
  checkRequest, sendResponse
}