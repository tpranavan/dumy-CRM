import { eq } from 'drizzle-orm';
import { getDatabase } from '../../../config/database.js';
import { users } from '../../../db/schema/users.js';
import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';
import { DATABASE, ERROR_MESSAGES } from '../constants/constants.js';
import { logger } from '../../../utils/logger.js';

/**
 * Auth repository for user data operations
 */
class AuthRepository {
  constructor() {
    this.db = getDatabase();
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<object|null>} - User object or null
   * @throws {BaseException} If database query fails
   */
  async findByEmail(email) {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return result[0] || null;
    } catch (error) {
      logger.error('Error finding user by email', { error, email });
      
      // Re-throw known exceptions
      if (error instanceof BaseException) {
        throw error;
      }

      // Wrap database errors
      throw new BaseException(
        ERROR_MESSAGES.DATABASE_QUERY_FAILED,
        500,
        ErrorCodes.DB_QUERY_ERROR,
        { originalError: error.message }
      );
    }
  }

  /**
   * Create a new user
   * @param {object} userData - User data
   * @returns {Promise<object>} - Created user object
   * @throws {BaseException} If database insert fails
   */
  async create(userData) {
    try {
      const result = await this.db
        .insert(users)
        .values(userData)
        .returning();

      return result[0];
    } catch (error) {
      logger.error('Error creating user', { error, email: userData?.email });
      
      // Re-throw known exceptions (like constraint violations)
      if (error instanceof BaseException) {
        throw error;
      }

      // Handle database constraint errors
      if (error.code === DATABASE.UNIQUE_CONSTRAINT_VIOLATION_CODE) {
        throw new BaseException(
          ERROR_MESSAGES.USER_ALREADY_EXISTS_DB,
          409,
          ErrorCodes.DB_CONSTRAINT_ERROR
        );
      }

      // Wrap other database errors
      throw new BaseException(
        ERROR_MESSAGES.DATABASE_CREATE_FAILED,
        500,
        ErrorCodes.DB_QUERY_ERROR,
        { originalError: error.message }
      );
    }
  }
}

export const authRepository = new AuthRepository();

