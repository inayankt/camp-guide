const Joi = require('joi');

const ExpressError = require('../utils/ExpressError');

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required()
  }).required(),
  deleteImages: Joi.array()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5)
  }).required()
});

const userRegSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
});

const userLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});


module.exports.validateCampground = (req, res, next) => {
  const { error: validationError } = campgroundSchema.validate(req.body);
  if(validationError) {
    const msg = validationError.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error: validationError } = reviewSchema.validate(req.body);
  if(validationError) {
    const msg = validationError.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUserReg = (req, res, next) => {
  const { error: validationError } = userRegSchema.validate(req.body);
  if(validationError) {
    const msg = validationError.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUserLogin = (req, res, next) => {
  const { error: validationError } = userLoginSchema.validate(req.body);
  if(validationError) {
    const msg = validationError.details.map(el => el.message).join(', ');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
