import Joi from 'joi';
import {ValidationError} from '../error/errors.js';
import {ADMIN, MODERATOR, USER} from "../configuration/constants.js";

const schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).unique()
    }),
    addComment: Joi.object({
        message: Joi.string().required(),
    }),
    updatePost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string())
    }),
    dateFormat: Joi.object({
        dateFrom: Joi.date().iso().required(),
        dateTo: Joi.date().iso().required().greater(Joi.ref('dateFrom')),
    }),

    register: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    }),

    updateUser: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
    }).min(1),

    changeRole: Joi.object({
        login:Joi.string().required(),
        role: Joi.string().uppercase().valid(USER, ADMIN, MODERATOR).insensitive().required()
    }),

    changePassword: Joi.object({
        password: Joi.string().required(),
    })

}

const validate = (schemaName, target = 'body') => (req, res, next) => {
    const schema = schemas[schemaName];
    if(!schema) {
        return next(new Error('Invalid schema name'));
    }
    const {error, value} = schema.validate(req[target], {
        abortEarly: false,
        stripUnknown: true,
    });

    if(error) {
        return next(
            new ValidationError(error.details.map(e => e.message).join(', ')),
        );
    }
    req[target] = value;
    return next();
}

export default validate;