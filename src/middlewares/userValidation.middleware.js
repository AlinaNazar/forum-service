import Joi from 'joi';

const schemas = {
    register: Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        roles: Joi.array().items(Joi.string()).default(["User"]),
    }),

}

const userValidate = (schemaName, target = 'body') => (req, res, next) => {
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

export default userValidate;