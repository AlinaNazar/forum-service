export const errorhandler = (err, req, res, next) => {
    console.log(err);
    if (err.code === 11000) {
        return res.status(409).json({
            timestamp: new Date().toISOString(),
            status: 409,
            error: 'Conflict',
            message: `User with login ${Object.keys(err.keyValue)[0]} already exists`,
            path: req.path
        });
    }
    const status = err.statusCode || 500;
    res.status(status).json({
        timeStamp: new Date().toISOString(),
        status,
        error: err.name || 'Server error',
        message: err.message,
        path: req.path
    })
}


// const errorUserHandler = (err, req, res, next) => {
//     console.log(err.stack)
//     const msg = err?.message?.toLowerCase();
//
//     const contains = msg.includes('already registered') ? 'conflict'
//         : msg.includes('unauthorized') ? 'unauthorized'
//         : msg.includes('forbidden') ? 'forbidden' : null;
//
//     if (err.message && contains === 'conflict') {
//         return res.status(409).json({
//             "timestamp": new Date().toISOString(),
//             "status": 409,
//             "error": "Conflict",
//             "message": `User with userName ${req.params.userName} already exists.`,
//             "path": req.path
//         });
//     }
//
//     if (err.message && contains === 'unauthorized') {
//         return res.status(401).json({
//             "timestamp": new Date().toISOString(),
//             "status": 401,
//             "error": "Unauthorized",
//             "message": `User with userName ${req.params.userName} unauthorized.`,
//             "path": req.path
//         });
//     }
//
//     if (err.message && contains === 'forbidden') {
//         return res.status(403).json({
//             "timestamp": new Date().toISOString(),
//             "status": 403,
//             "error": "Forbidden",
//             "message": `Action for user ${req.params.userName} forbidden.`,
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
// export default errorUserHandler;