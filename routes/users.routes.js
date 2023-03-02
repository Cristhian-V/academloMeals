const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, updateUser, deleteUser, findOrders, findOrderById } = require("../controllers/users.controller");
const { userExist, validDataUser, validToken, protectAccountOwner } = require("../middlewares/users.meddleware");
const { validData } = require("../middlewares/validData.middlewares");

const router = Router()

router.post('/signup', [
  check('name','name is mandatory').not().isEmpty(),
  check('email','email is mandatory').not().isEmpty(),
  check('email','format incorrect').isEmail(),
  check('password','password is mandatory').not().isEmpty(),
  validData,
  userExist,
],
createUser
)

router.post('/login',[
  check('email','email is mandatory').not().isEmpty(),
  check('email','format incorrect').isEmail(),
  check('password','password is mandatory').not().isEmpty(),
  validData,
  validDataUser,
],
  login
)

router.post('/login',[
  check('email','email is mandatory').not().isEmpty(),
  check('email','format incorrect').isEmail(),
  check('password','password is mandatory').not().isEmpty(),
  validData,
  validDataUser,
],
  login
)

router.patch('/:id', [
  check('name','name is mandatory').not().isEmpty(),
  check('email','email is mandatory').not().isEmpty(),
  check('email','format incorrect').isEmail(),
  validData,
  validToken,
  protectAccountOwner,
],
  updateUser
)

router.delete('/:id', [
  validToken,
  protectAccountOwner,
],
  deleteUser
)

router.get('/orders',[
  validToken,
],
  findOrders
)

router.get('/orders/:id',[
  validToken,
],
  findOrderById
)

module.exports = {
  routesUsers : router
}