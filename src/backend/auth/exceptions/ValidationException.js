import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';

/**
 * Exception for validation errors
 */
export class ValidationException extends BaseException {
  constructor(message, details = null) {
    super(
      message || 'Validation failed',
      400,
      ErrorCodes.VALIDATION_ERROR,
      details
    );
  }
}

