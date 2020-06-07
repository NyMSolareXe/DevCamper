const express = require('express')
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses')

const Course = require('../models/Course')
const advancedResults = require('../middleware/advancedResults')



// const router = express.Router()

const router = express.Router({ mergeParams: true })

const { protect, authorize } = require('../middleware/auth')

const populateObject = {
  path: 'bootcamp',
  select: 'name description'
}

router.route('/').get(advancedResults(Course, populateObject), getCourses)
router.route('/:id').get(getCourse)
router.route('/').post(protect, authorize('publisher', 'admin'), addCourse)
router.route('/:id').put(protect, authorize('publisher', 'admin'), updateCourse)
router.route('/:id').delete(protect, authorize('publisher', 'admin'), deleteCourse)


module.exports = router