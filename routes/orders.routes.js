const { Router } = require("express");
const { check } = require("express-validator");
const { createOrder, findAllOrdersByUser, updateOrder, deleteOrder } = require("../controllers/orders.controller");
const { mealExist, checkStatus, protecOrderOwner } = require("../middlewares/orders.middleware");
const { validToken } = require("../middlewares/users.meddleware");
const { validData } = require("../middlewares/validData.middlewares");

const router = Router()

router.post('/',[
  check('quantity', 'quantity is mandatory').not().isEmpty(),
  check('mealId', 'mealId is mandatory').not().isEmpty(),
  check('mealId', 'incorret format').isInt(),
  validData,
  validToken,
  mealExist,
],
  createOrder
)

router.get('/me',[
  validToken,
],
  findAllOrdersByUser
)

router.patch('/:id',[
  validToken,
  checkStatus,
  protecOrderOwner,
],
  updateOrder
)

router.delete('/:id',[
  validToken,
  checkStatus,
  protecOrderOwner,
],
  deleteOrder
)

module.exports={
  routesOrders: router
}