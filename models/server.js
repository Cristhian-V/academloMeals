const express = require('express')
const cors = require('cors')
const {db} = require('../database/config')
const initModel = require('./init.model')
const { AppError } = require('../utils/appError')
const { globalErrorHandler } = require('../controllers/error.controller')
const { routesUsers } = require('../routes/users.routes')
const { routesRestaurants } = require('../routes/restaurants.routes')
const { routesMeals } = require('../routes/meals.routes')
const { routesOrders } = require('../routes/orders.routes')
 
class Server {
  constructor(){
    this.app = express()
    this.port = process.env.port

    //path Routes 
    this.path = {
      users: '/api/v1/users',
      restaurants: '/api/v1/restaurants',
      meals: '/api/v1/meals',
      orders: '/api/v1/orders'
    }
    //connect DB
    this.database()
    //middlewares
    this.middlewares()
    //routes
    this.routes()
  }

  middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes(){
    this.app.use(this.path.users, routesUsers)
    this.app.use(this.path.restaurants, routesRestaurants)
    this.app.use(this.path.meals, routesMeals)
    this.app.use(this.path.orders, routesOrders)

    this.app.all('*', (req, res, next) =>{
      return next(new AppError(`La ruta ${req.originalUrl} no existe en el servidor`, 404))
    })

    this.app.use(globalErrorHandler)
  }

  database(){
    db.authenticate()
      .then(()=>console.log('dataBase authenticated'))
      .catch(err => console.log(err))

    initModel()

    db.sync()
      .then(()=> console.log('dataBase synced'))
      .catch(err => console.log(err))
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('Server running on PORT', this.port )
    })
  }
}

module.exports = Server