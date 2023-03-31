const Joi = require('joi');

// Validation schema for user input

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    userSchema
};
