const Users = require("../models/users.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const userExist = catchAsync(async(req,res,next)=>{
  const {email} = req.body
  const user = await Users.findOne({
    where:{
      email
    }
  })

  if(user) return next(new AppError('user email is already registered', 401))

  next()
})

module.exports = {
  userExist
}