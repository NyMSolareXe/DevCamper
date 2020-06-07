const express = require('express')
const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controllers/reviews')

const Review = require('../models/Review')

const router = express.Router({ mergeParams: true })


const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')



const populateObject = {
  path: 'bootcamp',
  select: 'name description'
}

router.route('/').get(advancedResults(Review, populateObject), getReviews).post(protect, authorize('user', 'admin'), addReview)

router.route('/:id').get(getReview).put(protect, authorize('user', 'admin'), updateReview).delete(protect, authorize('user', 'admin'), deleteReview)


// router.route('/:id').get(getCourse)
// router.route('/').post(protect, authorize('publisher', 'admin'), addCourse)
// router.route('/:id').put(protect, authorize('publisher', 'admin'), updateCourse)
// router.route('/:id').delete(protect, authorize('publisher', 'admin'), deleteCourse)


module.exports = router