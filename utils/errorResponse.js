class ErrorResponse extends Error {
  constructor(message, statusCode, errorObject) {
    super(message)
    this.statusCode = statusCode
    // if (errorObject) {
    this.errorObject = errorObject
    // }
  }
}

module.exports = ErrorResponse