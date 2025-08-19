class BaseHttpError extends Error {
  constructor(message, statusCode = 500, details = undefined) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

class BadRequestError extends BaseHttpError {
  constructor(message = 'Bad Request', details) {
    super(message, 400, details);
  }
}

class UnauthorizedError extends BaseHttpError {
  constructor(message = 'Unauthorized', details) {
    super(message, 401, details);
  }
}

class NotFoundError extends BaseHttpError {
  constructor(message = 'Not Found', details) {
    super(message, 404, details);
  }
}

module.exports = {
  BaseHttpError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError
};

