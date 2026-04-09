export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
export class NotFoundError extends AppError {
    constructor(message = 'Resource Not Found') {
        super(message, 404);
    }
}

export class DatabaseError extends AppError {
    constructor(message = 'Database Error') {
        super(message, 500);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict Error') {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 403);
    }
}





