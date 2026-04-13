import {ConflictError} from "../error/errors.js";

const errorTitles = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
};

 const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        err = new ConflictError(`Resource with ${field} '${value}' already exists`);
    }

    const status = err.statusCode || 500;

    return res.status(status).json({
        timestamp: new Date().toISOString(),
        status,
        error: errorTitles[status] || "Error",
        message: err.message || "Internal Server Error",
        path: req.path,
    });

}
export default errorHandler;

// const errorHandler = (err, req, res, next) => {
//     console.log(err.stack)
//     const contains = err.message.toLowerCase().includes('not found');
//
//     if (err.message && contains) {
//         return res.status(404).json({
//             "timestamp": new Date().toISOString(),
//             "status": 404,
//             "error": "Not Found",
//             "message": `Post with id ${req.params.id} not found.`,
//             "path": req.path
//         });
//     }
//
//     return res.status(500).json({
//         "timestamp": new Date().toISOString(),
//         "status": 500,
//         "error": "Internal Server Error",
//         "path": req.path,
//         message: err.message
//     })
// }
//
// export default errorHandler;