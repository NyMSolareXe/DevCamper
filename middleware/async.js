const asyncHandler = myFunction => (req, res, next) =>
  Promise.resolve(myFunction(req, res, next))
    .catch(next)

module.exports = asyncHandler