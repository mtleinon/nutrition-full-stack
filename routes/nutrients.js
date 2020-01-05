const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createNutrient,
  getNutrients,
  updateNutrient,
  deleteNutrient
} = require('../controllers/nutrients');

router.post('/', [
  check('create.mealId').isNumeric().withMessage('mealId can not be empty.'),
  check('create.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
  check('create.amount').isNumeric().withMessage('amount must be a number.'),
], createNutrient);

router.get('/:id', getNutrients);
router.get('/', getNutrients);

router.patch('/:id', [
  check('create.mealId').isNumeric().withMessage('mealId can not be empty.'),
  check('create.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
  check('create.amount').isNumeric().withMessage('amount must be a number.'),
], updateNutrient);

router.delete('/:id', deleteNutrient);

module.exports = router;