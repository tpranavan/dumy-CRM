import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';

/**
 * Exception for resource not found errors
 */
export class NotFoundException extends BaseException {
  constructor(message = 'Resource not found', details = null) {
    super(
      message,
      404,
      ErrorCodes.NOT_FOUND,
      details
    );
  }
}

