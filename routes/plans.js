const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan
} = require('../controllers/plans');

router.post('/', [
  check('create.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('create.userId').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('UserId can not be empty.'),
  check('create.description').trim()
], createPlan);

router.get('/:userId/:planId', getPlans);
router.get('/:userId', getPlans);

router.patch('/:id', [
  check('update.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('update.userId').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('UserId can not be empty.'),
  check('update.description').trim()
], updatePlan);

router.delete('/:id', deletePlan);

module.exports = router;