const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const passport = require("passport");

const {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal
} = require('../controllers/meals');

router.post('/',
  passport.authenticate("jwt", { session: false }),
  [
    check('newMeal.planId').isNumeric().withMessage('planId can not be empty.'),
    // check('newMeal.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
    check('newMeal.name').trim(),
    check('newMeal.description').trim()
  ],
  createMeal
);

router.get('/:mealId',
  passport.authenticate("jwt", { session: false }),
  getMeals
);

router.get('/',
  passport.authenticate("jwt", { session: false }),
  getMeals
);

router.patch('/:mealId',
  passport.authenticate("jwt", { session: false }),
  [
    check('meal.planId').isNumeric().withMessage('planId can not be empty.'),
    // check('meal.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
    check('meal.name').trim(),
    // check('meal.description').trim()
  ], updateMeal
);

router.delete('/:mealId',
  passport.authenticate("jwt", { session: false }),
  deleteMeal
);

module.exports = router;