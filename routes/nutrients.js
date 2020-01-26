const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createNutrient,
  getNutrients,
  updateNutrient,
  deleteNutrient
} = require('../controllers/nutrients');

router.post('/:userId', [
  check('create.mealId').isNumeric().withMessage('mealId can not be empty.'),
  check('create.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
  check('create.amount').isNumeric().withMessage('amount must be a number.'),
], createNutrient);

router.get('/:userId/:nutrientId', getNutrients);
router.get('/:userId', getNutrients);

router.patch('/:userId/:nutrientId', [
  check('update.mealId').isNumeric().withMessage('mealId can not be empty.'),
  check('update.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
  check('update.amount').isNumeric().withMessage('amount must be a number.'),
], updateNutrient);

router.delete('/:userId/:nutrientId', deleteNutrient);

module.exports = router;