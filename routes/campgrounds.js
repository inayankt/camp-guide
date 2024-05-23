const express = require('express');
const multer = require('multer');

const { validateCampground } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { isCampAuthor } = require('../middlewares/authorize');
const { allCampgrounds, renderNewForm, registerCampground, showCampground, renderEditForm, editCampground, deleteCampground } = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { storage } = require('../cloudinary');

const router = express.Router();
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(allCampgrounds))
  .post(isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(registerCampground));
      
  
router.get('/new',
            isLoggedIn,
            renderNewForm);

router.route('/:id')
  .get(catchAsync(showCampground))
  .put(isLoggedIn,
        isCampAuthor,
        upload.array('image'),
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
