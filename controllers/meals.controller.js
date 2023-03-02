const Meals = require("../models/meals.model");
const Restaurants = require("../models/restaurants.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");


const createMeal = catchAsync(async(req,res,next) =>{
  const {name, price} = req.body
  const restaurantId = req.params.id

  const restaurant = await Restaurants.findOne({
    where:{
      id: restaurantId
    }
  })

  if(!restaurant) return next(new AppError('el restaurante al que esta intentando registrar el menu no existe'))

  const meal = new Meals({name, price, restaurantId})
  meal.save()

  return res.status(200).json({
    status: 'success',
    message: 'The meal has been added'
  })
})

const findAllMeals = catchAsync(async(req,res,next) =>{
  const meals = await Meals.findAll()
  const restaurants = await Restaurants.findAll()

  const mealsDetails = meals.map(meal => {
    let _meal = {...meal.dataValues}

    meal.restaurant = restaurants.find(restaurant =>{
      return meal.restaurantId === restaurant.id
    })

    _meal.restaurant = meal.restaurant

    return _meal
  })

  return res.status(200).json({
    status: 'success',
    mealsDetails
  })
})

const findAllMeal = catchAsync(async(req,res,next) =>{
  const {id} = req.params
  const meal = await Meals.findOne({
    where:{
      id
    }
  })
  const restaurants = await Restaurants.findAll()

  meal.restaurant = restaurants.find(restaurant => {
    return restaurant.id === meal.restaurantId
  })
  let _meal = {...meal.dataValues}
  _meal.restaurant = meal.restaurant

  return res.status(200).json({
    status: 'success',
    _meal
  })
})

const updateMeal = catchAsync(async(req,res,next) =>{
  const {name, price} = req.body
  const {id} = req.params
  
  const meal = await Meals.update({
    name,
    price
  },{
    where:{
      id
    }
  })

  if(!meal[0]) return next(new AppError('El plato de comida no existe'))

  return res.status(200).json({
    status: 'success',
    message: 'The product has been updated'
  })
})

const deleteMeal = catchAsync(async(req,res,next) =>{
  const {id} = req.params
  
  const meal = await Meals.update({
    status: false
  },{
    where:{
      id
    }
  })

  if(!meal[0]) return next(new AppError('El plato de comida no existe'))

  return res.status(200).json({
    status: 'success',
    message: 'The product has been deleted'
  })
})

module.exports = {
  createMeal, findAllMeals, findAllMeal, updateMeal, deleteMeal
}