import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';

/**
 * Exception for unauthorized access errors
 */
export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized access', details = null) {
    super(
      message,
      401,
      ErrorCodes.UNAUTHORIZED,
      details
    );
  }
}

