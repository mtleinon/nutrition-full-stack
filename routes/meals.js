const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal
} = require('../controllers/meals');

router.post('/:userId', [
  check('create.planId').isNumeric().withMessage('planId can not be empty.'),
  check('create.userId').isNumeric().withMessage('userId can not be empty.'),
  check('create.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('create.description').trim()
], createMeal);

router.get('/:userId/:mealId', getMeals);
router.get('/:userId', getMeals);

router.patch('/:userId/:mealId', [
  check('update.planId').isNumeric().withMessage('planId can not be empty.'),
  check('update.userId').isNumeric().withMessage('userId can not be empty.'),
  check('update.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('update.description').trim()
], updateMeal);

router.delete('/:userId/:mealId', deleteMeal);

module.exports = router;