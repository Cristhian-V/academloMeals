const { Router } = require("express");
const { check } = require("express-validator");
const { createRestaurant, 
  findAllRestaurants, 
  findOneRestaurant, 
  updateRestaturant,
  deleteRestaurant,
  createReviewForRestaurant,
  updateReview,
  deleteReview} = require("../controllers/restaurants.controller");
const { protectReviewOwner } = require("../middlewares/restaurants.meddleware");

const { validToken, validUserAdmin } = require("../middlewares/users.meddleware");
const { validData } = require("../middlewares/validData.middlewares");

const router = Router()

router.post('/', [
  check('name', 'name is mandatory').not().isEmpty(),
  check('address', 'address is mandatory').not().isEmpty(),
  check('rating', 'rating is mandatory').not().isEmpty(),
  check('rating', 'invalid format').isInt(),
  validData,
  validToken,
  validUserAdmin,
],
  createRestaurant
)

router.get('/', [
  validToken,
],
  findAllRestaurants
)

router.get('/:id',[
  validToken,
],    
  findOneRestaurant
)

router.patch('/:id', [
  check('name', 'name is mandatory').not().isEmpty(),
  check('address', 'address is mandatory').not().isEmpty(),
  validData,
  validToken,
  validUserAdmin,
],
  updateRestaturant
)

router.delete('/:id', [
  validToken,
  validUserAdmin,
],
  deleteRestaurant
)

router.post('/reviews/:id',[
  check('comment', 'comment is mandatory').not().isEmpty(),
  check('rating', 'rating is mandatory').not().isEmpty(),
  check('rating', 'rating is mandatory').isInt(),
  validData,
  validToken,
  validUserAdmin,
],
  createReviewForRestaurant
)

router.patch('/reviews/:restaurantId/:id',[
  check('comment', 'comment is mandatory').not().isEmpty(),
  check('rating', 'rating is mandatory').not().isEmpty(),
  check('rating', 'rating is mandatory').isInt(),
  validData,
  validToken,
  protectReviewOwner
],
  updateReview
)

router.delete('/reviews/:restaurantId/:id',[
  validToken,
  protectReviewOwner
],
  deleteReview
)

module.exports = {
  routesRestaurants : router
}