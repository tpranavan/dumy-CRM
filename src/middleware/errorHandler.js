import { BaseException } from '../common/exceptions/BaseException.js';
import { CommonErrorCodes } from '../common/error-codes/ErrorCodes.js';
import { logger } from '../utils/logger.js';

/**
 * Global error handler middleware
 * Handles only common errors - module-specific errors are handled by their respective modules
 */
export async function errorHandler(error, request, reply) {
  // Handle custom exceptions (from any module)
  if (error instanceof BaseException) {
    logger.error('Custom exception occurred', error);
    return reply.status(error.statusCode).send(error.toJSON());
  }

  // Handle validation errors from Fastify (common framework validation)
  if (error.validation) {
    logger.error('Validation error', error);
    return reply.status(400).send({
      error: {
        message: 'Validation failed',
        code: CommonErrorCodes.VALIDATION_ERROR,
        statusCode: 400,
        details: error.validation.map(err => ({
          field: err.instancePath || err.params?.missingProperty || 'unknown',
          message: err.message
        }))
      }
    });
  }

  // Handle database constraint errors (common database errors)
  if (error.code === '23505') { // Unique constraint violation
    logger.error('Database constraint error', error);
    return reply.status(409).send({
      error: {
        message: 'Resource already exists',
        code: CommonErrorCodes.CONFLICT,
        statusCode: 409
      }
    });
  }

  // Handle unknown/unexpected errors (common error handling)
  logger.error('Unexpected error occurred', error);
  return reply.status(500).send({
    error: {
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      code: CommonErrorCodes.INTERNAL_ERROR,
      statusCode: 500,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
}

