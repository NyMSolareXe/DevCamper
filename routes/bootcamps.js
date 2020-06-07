const express = require('express')
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampsInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps')


const Bootcamp = require('../models/Bootcamp')

const advancedResults = require('../middleware/advancedResults')

// Include other resource routers
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')


const router = express.Router()

const { protect, authorize } = require('../middleware/auth')



// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)


// router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps)
router.route('/').post(protect, authorize('publisher', 'admin'), createBootcamp)


router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)


// router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/:id').get(getBootcamp)
router.route('/:id').put(protect, authorize('publisher', 'admin'), updateBootcamp)
router.route('/:id').delete(protect, authorize('publisher', 'admin'), deleteBootcamp)


module.exports = router