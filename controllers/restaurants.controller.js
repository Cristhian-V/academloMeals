const Restaurants = require("../models/restaurants.model");
const Reviews = require("../models/reviews.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");


const createRestaurant = catchAsync(async(req,res,next)=>{
  const {name, address, rating} = req.body

  if(rating < 0 || rating > 5) return next(new AppError('Rating solo puede ser los numeros del 1 al 5'))

  const restaurant = new Restaurants({
    name,
    address,
    rating
  })

  restaurant.save()

  return res.status(200).json({
    status: 'success',
    restaurant
  })
})

const findAllRestaurants = catchAsync(async(req,res,next) =>{
  const restaurants = await Restaurants.findAll({
    where:{
      status:true
    }
  })

  const reviews = await Reviews.findAll()

  let restaturantDetails = restaurants.map( restaurant => {
    let _restaurant = {...restaurant.dataValues}

    restaurant.reviews = reviews.map(review => {return restaurant.id === review.restaurantId})

    _restaurant.reviews = restaurant.reviews
    
    return _restaurant
  })

  return res.status(200).json({
    status: 'success',
    restaturantDetails
  })
})

const findOneRestaurant = catchAsync(async(req,res,next) => {
  const {id} = req.params
  const restaurant = await Restaurants.findOne({
    where:{
      id,
      status:true
    }
  })

  if(!restaurant) return next(new AppError('El restaurante solicitado no existe o esta deshabilirado'))

  const reviews = await Reviews.findAll()
  
  restaurant.reviews = reviews.map(review => {return restaurant.id === review.restaurantId})

  let _restaurant = {...restaurant.dataValues}
  _restaurant.reviews = restaurant.reviews

  return res.status(200).json({
    status: 'success',
    _restaurant
  })
})

const updateRestaturant = catchAsync(async(req,res,next) =>{
  const {name, address} = req.body
  const {id} = req.params
  const restaurant = await Restaurants.update({
    name,
    address
  },{
    where:{
      id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'updated Restaturant'
  })
})

const deleteRestaurant = catchAsync(async(req,res,next)=>{
  const {id} = req.params
  const restaurant = await Restaurants.update({
    status: false
  },{
    where:{
      id,
      status: true
    }
  })

  if(!restaurant[0]) return next(new AppError('El restaurante no existe o ya esta deshabilitado'))

  return res.status(200).json({
    status: 'success',
    message: 'deleted Restaturant'
  })
})

const createReviewForRestaurant = catchAsync(async(req,res,next)=>{
  const {comment, rating} = req.body
  const restaurantId = req.params.id
  const userId = req.decoded.id

  const review = new Reviews({userId, comment, restaurantId, rating})

  review.save()

  return res.status(200).json({
    status: 'success',
    message: 'registered comment'
  })
})

const updateReview = catchAsync(async(req, res,next)=>{
  const {comment, rating} = req.body
  const {id} = req.params
  const review = await Reviews.update({
    comment,
    rating
  },{
    where:{
      id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'Updated Review'
  })
})

const deleteReview = catchAsync(async(req,res,next) =>{
  const {id} = req.params
  const review = await Reviews.destroy({
    where:{
      id
    }
  })

  return res.status(200).json({
    status: 'success',
    message: 'Deleted Review'
  })
})

module.exports = {
  createRestaurant, 
  findAllRestaurants, 
  findOneRestaurant, 
  updateRestaturant, 
  deleteRestaurant, 
  createReviewForRestaurant,
  updateReview,
  deleteReview
}