const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message

  // Log to console for dev
  // console.log(err.stack.red)

  // console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    // const message = `Resource not found with id of ${err.value}`
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate, that name already exists`
    const errorObject = {}
    Object.keys(err.keyValue).map(element => {
      errorObject[element] = `The name ${err.keyValue[element]} already exist in the database`
    })
    error = new ErrorResponse(message, 400, errorObject)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errorObject = {}
    const message = Object.values(err.errors).map(element => {
      errorObject[element.path] = element.message
      return element.message
    })


    error = new ErrorResponse(message, 400, errorObject)
  }


  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    validation: error.errorObject
  })
}


module.exports = errorHandler
