const Users = require("../models/users.model");
const { catchAsync } = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");
const Orders = require("../models/orders.model");
const Meals = require('../models/meals.model');
const Restaurants = require("../models/restaurants.model");


const createUser = catchAsync(async(req, res, next) => {
  let { name, email, password, role } = req.body

  name = name.toLowerCase()
  email = email.toLowerCase()

  const user = new Users({name, email, password})

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  if(role) user.role=role

  user.save()

  const token = await generateJWT(user.id)

  return res.status(200).json({
    status: 'success',
    message: 'The product has been added',
    user:{
      name,
      email,
      token
    },
  })
})

const login = catchAsync(async(req, res, next)=>{

  const token = await generateJWT(req.user.id)

  return res.status(200).json({
    status: 'success',
    message: 'The product has been added',
    user:{
      name: req.user.name,
      email: req.user.email,
      token
    },
  })
})

const updateUser = catchAsync(async(req,res,next) =>{
  const {name , email} = req.body

  const user = await Users.update({
    name,
    email
  },{
    where:{
      id:req.decoded.id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'updated user',
    user:{
      name: name,
      email: email
    },
  })
})

const deleteUser = catchAsync(async(req,res,next) => {
  const user = await Users.update({
    status: false
  },{
    where:{
      id:req.decoded.id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'deleted user',
  })
})

const findOrders = catchAsync(async(req, res, next) =>{
  const userId = req.decoded.id

  const orders = await Orders.findAll({
    where:{
      userId
    }
  })

  const meals = await Meals.findAll()
  const restaurants = await Restaurants.findAll()

  let orderDetails = orders.map(order => {
    let _order = {...order.dataValues}

    order.meal = meals.find(meal => {return meal.id === order.mealId})
    order.restaurant = restaurants.find(restaurant => {return restaurant.id === order.meal.restaurantId})

    _order.meal = order.meal
    _order.restaurant = order.restaurant
    return _order
  })

  return res.status(200).json({
    status: 'success',
    orderDetails
  })
})

const findOrderById = catchAsync(async(req, res, next) =>{
  const userId = req.decoded.id
  const {id} = req.params
  
  const order = await Orders.findOne({
    where:{
      id
    }
  })

  const meal = await Meals.findOne({
    where:{
      id: order.mealId
    }
  })
  const restaurant = await Restaurants.findOne({
    where:{
      id: meal.restaurantId
    }
  })

  let _order = {...order.dataValues}

  _order.meal = meal
  _order.restaurant = restaurant

  return res.status(200).json({
    status: 'success',
    _order
  })
})

module.exports = {
  createUser, login, updateUser, deleteUser, findOrders, findOrderById
}