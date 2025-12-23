import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';

/**
 * Exception for conflict errors (e.g., duplicate resources)
 */
export class ConflictException extends BaseException {
  constructor(message = 'Resource conflict', details = null) {
    super(
      message,
      409,
      ErrorCodes.CONFLICT,
      details
    );
  }
}

