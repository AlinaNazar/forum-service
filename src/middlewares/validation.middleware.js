import Joi from 'joi';

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



    //User
    createUser: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        roles: Joi.array().items(Joi.string()).default(["USER"]),
    }),

    updateUser: Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
    }),

    addRole: Joi.object({
        role: Joi.string().valid('USER', 'ADMIN', 'MODERATOR').required()
    }),

    changePassword: Joi.object({
        //TODO
    })

}



const validate = (schemaName, target = 'body') => (req, res, next) => {
    const schema = schemas[schemaName];
    if(!schema) {
        return next(new Error('Invalid schema name'));
    }
    const {error} = schema.validate(req[target]);
    if(error) {
        return res.status(400).send({
            message: error.details[0].message,
            code: 400,
            status: 'Bad Request',
            timestamp: new Date().toISOString(),
            path: req.path
        });
    }
    return next();
}

export default validate;