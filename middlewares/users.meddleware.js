const Users = require("../models/users.model");
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {promisify} = require('util');

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

const validDataUser = catchAsync(async(req, res, next) =>{
  const {email, password} = req.body

  const user = await Users.findOne({
    where:{
      email
    }
  })

  if(!user) return next(new AppError('Usuario o contraseña incorrecta', 401))
  if(!(await bcrypt.compare(password, user.password))) return next(new AppError('Usuario o contraseña incorrecta', 401))

  req.user = user

  next()
})

const validToken = catchAsync(async(req,res,next) =>{
  let token 

  if(req.headers.authorization && `${req.headers.authorization}`.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token) return next(new AppError('no te logueaste!!, por favor logueate'))

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

  req.decoded = decoded

  next()
})

const protectAccountOwner = catchAsync(async(req,res,next) =>{
  if(req.params.id != req.decoded.id) return next(new AppError('Solo el usuario dueño de la cuenta puede modificar estos datos, por favor logueate con el usuario correcto'))

  next()
})

const validUserAdmin = catchAsync(async(req,res,next)=>{
  const {id} = req.decoded
  const user = await Users.findOne({
    where:{
      id
    }
  })

  if(user.role != 'admin') return next(new AppError('solo los usuarios con rol Administrador pueden realizar esta accion'))

  req.user = user

  next()  
})

module.exports = {
  userExist, validDataUser, validToken, protectAccountOwner, validUserAdmin
}