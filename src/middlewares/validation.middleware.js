import Joi from 'joi';

const schemas = {
    createPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),

    })
}

const validate = schemaName => (req, res, next) => {
    const schema = schema[schemaName];
}