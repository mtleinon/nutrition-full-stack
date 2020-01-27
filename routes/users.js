const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const passport = require("passport");

const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUsers
} = require('../controllers/users');

router.post('/create/', [
  check('newUser.email').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Email can not be empty.'),
  check('newUser.password').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Password can not be empty.'),
  check('newUser.name').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Name can not be empty.'),
  check('newUser.gender').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Gender can not be empty.'),
  check('newUser.age').isNumeric().withMessage('age must be a number.'),
  check('newUser.weight').isNumeric().withMessage('weight must be a number.'),
  check('newUser.height').isNumeric().withMessage('height must be a number.'),
], createUser);

router.post('/signin/', [
  check('user.email').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Email can not be empty.'),
  check('user.password').not().isEmpty({ ignore_whitespace: true }).trim().withMessage('Password can not be empty.'),
], loginUser);

router.get('/:email/:password', (_, res) => res.json({ msg: "Route not supported anymore!" }));
router.get('/:userId', (_, res) => res.json({ msg: "Route not supported anymore!" }));
router.get('/',
  passport.authenticate("jwt", { session: false }),
  getUsers);

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