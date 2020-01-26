const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/users');

// TODO: check that email address isn't used already. 
router.post('/', [
  check('create.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('create.gender').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Gender can not be empty.'),
  check('create.age').isNumeric().withMessage('age must be a number.'),
  check('create.weight').isNumeric().withMessage('weight must be a number.'),
  check('create.height').isNumeric().withMessage('height must be a number.'),
], createUser);

router.get('/:email/:password', getUsers);
router.get('/:userId', getUsers);
router.get('/', getUsers);



router.patch('/:userId', [
  // check('update.userId').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('UserId can not be empty.'),
  check('update.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('update.gender').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Gender can not be empty.'),
  check('update.age').isNumeric().withMessage('age must be a number.'),
  check('update.weight').isNumeric().withMessage('weight must be a number.'),
  check('update.height').isNumeric().withMessage('height must be a number.'),
], updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;