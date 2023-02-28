class AppError extends Error{
  constructor(message, statusCode){
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail'
    
    this.operational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  AppError
}