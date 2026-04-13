import Joi from 'joi';
import {ValidationError} from '../error/errors.js';

const VALID_ROLES = ["USER", "MODERATOR", "ADMIN"];

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
        login: Joi.string().trim().min(3).required(),
        password: Joi.string().min(4).required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
    }),

    updateUser: Joi.object({
        firstName: Joi.string().trim(),
        lastName: Joi.string().trim(),
    }).min(1),

    changeRole: Joi.object({
        login:Joi.string().trim().required(),
        role: Joi.string().trim().uppercase().valid(...VALID_ROLES).required()
    }),

    changePassword: Joi.object({
        newPassword: Joi.string().trim().min(4).required(),
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