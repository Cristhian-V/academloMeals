const Users = require("../models/users.model");
const { catchAsync } = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');
const generateJWT = require("../utils/jwt");


const createUser = catchAsync(async(req, res, next) => {
  let { name, email, password, role } = req.body

  console.log(req.body)

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

module.exports = {
  createUser
}