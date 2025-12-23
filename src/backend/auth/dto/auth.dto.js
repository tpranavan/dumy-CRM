import { z } from 'zod';
import { PASSWORD, VALIDATION } from '../constants/constants.js';

/**
 * Sign up request DTO schema
 */
export const signUpSchema = z.object({
  email: z.string().email(VALIDATION.EMAIL_INVALID_MESSAGE),
  password: z.string().min(PASSWORD.MIN_LENGTH, PASSWORD.MIN_LENGTH_MESSAGE),
  firstName: z.string().min(1, VALIDATION.FIRST_NAME_REQUIRED_MESSAGE).optional(),
  lastName: z.string().min(1, VALIDATION.LAST_NAME_REQUIRED_MESSAGE).optional()
});

/**
 * Sign in request DTO schema
 */
export const signInSchema = z.object({
  email: z.string().email(VALIDATION.EMAIL_INVALID_MESSAGE),
  password: z.string().min(1, VALIDATION.PASSWORD_REQUIRED_MESSAGE)
});

/**
 * Sign up request DTO class
 */
export class SignUpRequestDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
  }
}

/**
 * Sign in request DTO class
 */
export class SignInRequestDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

/**
 * User response DTO class
 * Excludes sensitive information like password
 */
export class UserResponseDTO {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName || null;
    this.lastName = data.lastName || null;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Convert to plain object
   * @returns {object} Plain object representation
   */
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
