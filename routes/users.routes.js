const { Router } = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/users.controller");
const { userExist } = require("../middlewares/users.meddleware");
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


module.exports = {
  routesUsers : router
}