import { authRepository } from '../repository/auth.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { ConflictException } from '../exceptions/ConflictException.js';
import { UnauthorizedException } from '../exceptions/UnauthorizedException.js';
import { BaseException } from '../../../common/exceptions/BaseException.js';
import { ErrorCodes } from '../error-codes/ErrorCodes.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/constants.js';
import { logger } from '../../../utils/logger.js';
import { authMapper } from '../mapper/auth.mapper.js';

/**
 * Auth service for authentication business logic
 */
class AuthService {
  /**
   * Sign up a new user
   * @param {SignUpRequestDTO} signUpRequestDTO - Sign up request DTO
   * @returns {Promise<UserResponseDTO>} - Created user response DTO
   * @throws {ConflictException} If user already exists
   * @throws {BaseException} For unexpected errors
   */
  async signUp(signUpRequestDTO) {
    try {
      const { email, password, firstName, lastName } = signUpRequestDTO;

      // Check if user already exists
      const existingUser = await authRepository.findByEmail(email);
      if (existingUser) {
        throw new ConflictException(
          ERROR_MESSAGES.USER_ALREADY_EXISTS,
          { email }
        );
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const userData = {
        email,
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null
      };

      const user = await authRepository.create(userData);

      logger.info('User signed up successfully', { userId: user.id, email: user.email });

      // Map to response DTO
      return authMapper.toUserResponseDTO(user);
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof BaseException) {
        throw error;
      }

      // Log and wrap unexpected errors
      logger.error('Unexpected error in signUp', { error, email: signUpRequestDTO?.email });
      throw new BaseException(
        ERROR_MESSAGES.FAILED_TO_CREATE_USER,
        500,
        ErrorCodes.INTERNAL_ERROR,
        { originalError: error.message }
      );
    }
  }

  /**
   * Sign in a user
   * @param {SignInRequestDTO} signInRequestDTO - Sign in request DTO
   * @returns {Promise<UserResponseDTO>} - User response DTO
   * @throws {UnauthorizedException} If credentials are invalid or account is inactive
   * @throws {BaseException} For unexpected errors
   */
  async signIn(signInRequestDTO) {
    try {
      const { email, password } = signInRequestDTO;

      // Find user by email
      const user = await authRepository.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Check if user is active
      if (!user.isActive) {
        throw new UnauthorizedException(ERROR_MESSAGES.USER_ACCOUNT_INACTIVE);
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      logger.info('User signed in successfully', { userId: user.id, email: user.email });

      // Map to response DTO
      return authMapper.toUserResponseDTO(user);
    } catch (error) {
      // Re-throw known exceptions
      if (error instanceof BaseException) {
        throw error;
      }

      // Log and wrap unexpected errors
      logger.error('Unexpected error in signIn', { error, email: signInRequestDTO?.email });
      throw new BaseException(
        ERROR_MESSAGES.FAILED_TO_AUTHENTICATE,
        500,
        ErrorCodes.INTERNAL_ERROR,
        { originalError: error.message }
      );
    }
  }
}

export const authService = new AuthService();

