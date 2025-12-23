import bcrypt from 'bcryptjs';
import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';
import { PASSWORD, ERROR_MESSAGES } from '../constants/constants.js';
import { logger } from '../../../utils/logger.js';

/**
 * Hash a password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 * @throws {BaseException} If hashing fails
 */
export async function hashPassword(password) {
  try {
    return await bcrypt.hash(password, PASSWORD.SALT_ROUNDS);
  } catch (error) {
    logger.error('Error hashing password', error);
    throw new BaseException(
      ERROR_MESSAGES.FAILED_TO_HASH_PASSWORD,
      500,
      ErrorCodes.INTERNAL_ERROR
    );
  }
}

/**
 * Compare a password with a hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} - True if passwords match
 * @throws {BaseException} If comparison fails
 */
export async function comparePassword(password, hash) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    logger.error('Error comparing password', error);
    throw new BaseException(
      ERROR_MESSAGES.FAILED_TO_COMPARE_PASSWORD,
      500,
      ErrorCodes.INTERNAL_ERROR
    );
  }
}

