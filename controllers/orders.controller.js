const Meals = require("../models/meals.model");
const Orders = require("../models/orders.model");
const Restaurants = require("../models/restaurants.model");
const { catchAsync } = require("../utils/catchAsync");


const createOrder = catchAsync(async(req,res,next) =>{
  const {mealId, quantity} = req.body
  const totalPrice = req.total
  const userId = req.decoded.id
  const order = new Orders({mealId, userId, totalPrice, quantity})

  order.save()

  return res.status(200).json({
    status: 'success',
    nessage: 'The order has been added'
  })
})

const findAllOrdersByUser = catchAsync(async(req, res, next) =>{
  const userId = req.decoded.id

  const orders = await Orders.findAll({
    where:{
      userId
    }
  })

  const meals = await Meals.findAll()
  const restaurants = await Restaurants.findAll()

  const ordersDetail = orders.map( order => {
    let _order = {...order.dataValues}

    order.meal = meals.find(meal => {
      return meal.id === order.mealId
    })
    order.restaurant = restaurants.find(restaurant =>{
      return restaurant.id === order.meal.restaurantId
    })

    _order.meal = order.meal
    _order.restaurant = order.restaurant

    return _order
  })

  return res.status(200).json({
    status: 'success',
    ordersDetail
  })
})

const updateOrder = catchAsync(async(req,res,next) => {
  const {id} = req.params

  const order = await Orders.update({
    status:'completed'
  },{
    where:{
      id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'Updated Order'
  })
})

const deleteOrder = catchAsync(async(req,res,next)=>{
  const {id} = req.params

  const order = await Orders.update({
    status:'cancelled'
  },{
    where:{
      id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'deleted Order'
  })
})

module.exports = {
  createOrder, findAllOrdersByUser, updateOrder, deleteOrder
}