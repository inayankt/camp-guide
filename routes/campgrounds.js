const express = require('express');

const { validateCampground } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { isCampAuthor } = require('../middlewares/authorize');
const { allCampgrounds, renderNewForm, registerNewCamp, showCampground, renderEditForm, editCampground, deleteCampground } = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

router.route('/')
  .get(catchAsync(allCampgrounds))
  .post(isLoggedIn,
        validateCampground,
        catchAsync(registerNewCamp));
  
router.get('/new',
            isLoggedIn,
            renderNewForm);

router.route('/:id')
  .get(catchAsync(showCampground))
  .put(isLoggedIn,
        isCampAuthor,
        validateCampground,
        catchAsync(editCampground))
  .delete(isLoggedIn,
          isCampAuthor,
          catchAsync(deleteCampground));

router.get('/:id/edit',
            isLoggedIn,
            isCampAuthor,
            catchAsync(renderEditForm));

module.exports = router;
