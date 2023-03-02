const Restaurants = require("../models/restaurants.model");
const Reviews = require("../models/reviews.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const protectReviewOwner = catchAsync(async(req,res,next)=>{
  const {id, restaurantId} = req.params
  const userId = req.decoded.id

  const review = await Reviews.findOne({
    where:{
      id
    }
  })

  if(!review) return next(new AppError('La review solicitada no existe', 401))
  if(review.userId != userId) return next(new AppError('La modificacion de esta reseña solo puede ser actulizada por el autor', 401))

  const restaurant = await Restaurants.findOne({
    where:{
      id: review.restaurantId
    }
  })
  
  if(restaurant.id != restaurantId)  return next(new AppError('no Hay ninguna reseña para el restaurante solicitado', 401))

  req.review = review
  req.restaurant = restaurant

  next()
})

module.exports = {
  protectReviewOwner
}