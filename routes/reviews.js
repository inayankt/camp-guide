const express = require('express');

const catchAsync = require('../utils/catchAsync');
const { validateReview } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { canDelReview } = require('../middlewares/authorize');
const { addReview, deleteReview } = require('../controllers/reviews');

const router = express.Router({ mergeParams: true });

router.post('/',
            isLoggedIn,
            validateReview,
            catchAsync(addReview));

router.delete('/:reviewId',
              isLoggedIn,
              canDelReview,
              catchAsync(deleteReview));

module.exports = router;