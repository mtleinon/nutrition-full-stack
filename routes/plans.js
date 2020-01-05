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
  check('create.description').trim()
], createPlan);

router.get('/:id', getPlans);
router.get('/', getPlans);

router.patch('/:id', [
  check('update.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('update.description').trim()
], updatePlan);

router.delete('/:id', deletePlan);
// router.patch('/:id', updatePlan);

// router.delete('/:id', deletePlan);

module.exports = router;