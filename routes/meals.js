const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal
} = require('../controllers/meals');

router.post('/', [
  check('create.planId').isNumeric().withMessage('planId can not be empty.'),
  check('create.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('create.description').trim()
], createMeal);

router.get('/:id', getMeals);
router.get('/', getMeals);

router.patch('/:id', [
  check('update.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('update.description').trim()
], updateMeal);

router.delete('/:id', deleteMeal);
// router.patch('/:id', updateMeal);

// router.delete('/:id', deleteMeal);

module.exports = router;