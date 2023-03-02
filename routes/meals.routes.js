const { Router } = require("express");
const { check } = require("express-validator");
const { createMeal, findAllMeals, findAllMeal, updateMeal, deleteMeal } = require("../controllers/meals.controller");
const { validUserAdmin, validToken } = require("../middlewares/users.meddleware");
const { validData } = require("../middlewares/validData.middlewares");

const router = Router()

router.post('/:id', [
  check('name', 'name is mandatory').not().isEmpty(),
  check('price', 'price is mandatory').not().isEmpty(),
  check('price', 'incorrect format').isInt(),
  validData,
  validToken,
  validUserAdmin,
],
  createMeal
)

router.get('/', [
  validToken,
],
 findAllMeals
)

router.get('/:id', [
  validToken,
],
 findAllMeal
)

router.patch('/:id',[
  check('name', 'name is mandatory').not().isEmpty(),
  check('price', 'price is mandatory').not().isEmpty(),
  check('price', 'incorrect format').isInt(),
  validData,
  validToken,
  validUserAdmin,
],
  updateMeal
)

router.delete('/:id',[
  validToken,
  validUserAdmin,
],
  deleteMeal
)

module.exports = {
  routesMeals : router
}