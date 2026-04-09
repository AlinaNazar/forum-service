const errorUserHandler = (err, req, res, next) => {
    console.log(err.stack)
    const msg = err?.message?.toLowerCase();
    if(msg){
        const contains = msg.includes('unauthorized') ? 'unauthorized'
            : msg.includes('forbidden') ? 'forbidden' : '';
    }
    //TODO 409 already registered

    if (err.message && contains === 'unauthorized') {
        return res.status(401).json({
            "timestamp": new Date().toISOString(),
            "status": 401,
            "error": "Unauthorized",
            "message": `User with userName ${req.params.userName} unauthorized.`,
            "path": req.path
        });
    }
    if (err.message && contains === 'forbidden') {
        return res.status(403).json({
            "timestamp": new Date().toISOString(),
            "status": 403,
            "error": "Forbidden",
            "message": `Action for user ${req.params.userName} forbidden.`,
            "path": req.path
        });
    }

    return res.status(500).json({
        "timestamp": new Date().toISOString(),
        "status": 500,
        "error": "Internal Server Error",
        "path": req.path,
        message: err.message
    })
}

export default errorUserHandler;