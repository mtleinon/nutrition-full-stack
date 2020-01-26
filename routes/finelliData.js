const express = require('express')
const router = express.Router()

const {
  getFinelliData,
} = require('../controllers/finelliData');

router.get('/:finelliId', getFinelliData);
router.get('/', getFinelliData);

module.exports = router;