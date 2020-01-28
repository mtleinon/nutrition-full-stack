const express = require('express')
const router = express.Router()
const passport = require("passport");
const { check } = require('express-validator');

const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan
} = require('../controllers/plans');

router.post('/',
  passport.authenticate("jwt", { session: false }),
  [
    // check('newPlan.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
    check('newPlan.name').trim(),
    check('newPlan.description').trim()
  ],
  createPlan);

router.get('/:planId',
  passport.authenticate("jwt", { session: false }),
  getPlans);

router.get('/',
  passport.authenticate("jwt", { session: false }),
  getPlans);

router.patch('/:planId',
  passport.authenticate("jwt", { session: false }),
  [
    // check('plan.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
    check('plan.name').trim(),
    check('plan.description').trim()
  ],
  updatePlan);

router.delete('/:planId',
  passport.authenticate("jwt", { session: false }),
  deletePlan);

module.exports = router;