const Meals = require("../models/meals.model");
const Orders = require("../models/orders.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");


const mealExist = catchAsync(async(req,res,next) =>{
  const {quantity ,mealId} = req.body
  
  const meal = await Meals.findOne({
    where:{
      id : mealId
    }
  })

  if(!meal) return next(new AppError('el plato pedido no existe'), 401)

  req.meal = meal
  req.total = meal.price * quantity
    
  next()
})

const checkStatus = catchAsync(async(req,res,next) =>{
  const {id} = req.params
  const userId = req.decoded

  const order = await Orders.findOne({
    where:{
      id,
      status:'active'
    }
  })

  if(!order) return next(new AppError('el plato del menu no existe o no esta activo'),401)

  req.order = order

  next()
})

const protecOrderOwner = catchAsync(async(req,res,next) =>{
  const userIdReq = req.decoded.id
  const useIdOrder = req.order.userId

  if(userIdReq != useIdOrder) return next(new AppError('Solo el dueño de la orden puede realizar esta accion',401))

  next()
})

module.exports = {
  mealExist, checkStatus, protecOrderOwner
}