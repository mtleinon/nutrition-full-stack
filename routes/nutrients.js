const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const passport = require("passport");

const {
  createNutrient,
  getNutrients,
  updateNutrient,
  deleteNutrient
} = require('../controllers/nutrients');

router.post('/',
  passport.authenticate("jwt", { session: false }),
  [
    check('newNutrient.mealId').isNumeric().withMessage('mealId can not be empty.'),
    check('newNutrient.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
    check('newNutrient.amount').isNumeric().withMessage('amount must be a number.'),
  ],
  createNutrient
);

router.get('/:nutrientId',
  passport.authenticate("jwt", { session: false }),
  getNutrients
);

router.get('/',
  passport.authenticate("jwt", { session: false }),
  getNutrients
);

router.patch('/:nutrientId',
  passport.authenticate("jwt", { session: false }),
  [
    check('nutrient.mealId').isNumeric().withMessage('mealId can not be empty.'),
    check('nutrient.finelliId').isNumeric().withMessage('finelliId can not be empty.'),
    check('nutrient.amount').isNumeric().withMessage('amount must be a number.'),
  ],
  updateNutrient
);

router.delete('/:nutrientId',
  passport.authenticate("jwt", { session: false }),
  deleteNutrient
);

module.exports = router;