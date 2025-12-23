/**
 * Authentication module constants
 * Centralized constants for consistent use across the auth module
 */

// Password constants
export const PASSWORD = {
  MIN_LENGTH: 8,
  SALT_ROUNDS: 10,
  MIN_LENGTH_MESSAGE: 'Password must be at least 8 characters'
};

// Validation constants
export const VALIDATION = {
  EMAIL_INVALID_MESSAGE: 'Invalid email format',
  PASSWORD_REQUIRED_MESSAGE: 'Password is required',
  FIRST_NAME_REQUIRED_MESSAGE: 'First name is required',
  LAST_NAME_REQUIRED_MESSAGE: 'Last name is required'
};

// Error messages
export const ERROR_MESSAGES = {
  USER_ALREADY_EXISTS: 'User with this email already exists',
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_ACCOUNT_INACTIVE: 'User account is inactive',
  FAILED_TO_CREATE_USER: 'Failed to create user account',
  FAILED_TO_AUTHENTICATE: 'Failed to authenticate user',
  FAILED_TO_HASH_PASSWORD: 'Failed to hash password',
  FAILED_TO_COMPARE_PASSWORD: 'Failed to compare password',
  DATABASE_QUERY_FAILED: 'Database query failed',
  DATABASE_CREATE_FAILED: 'Failed to create user',
  USER_ALREADY_EXISTS_DB: 'User with this email already exists'
};

// Success messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  SIGN_IN_SUCCESSFUL: 'Sign in successful'
};

// Database constants
export const DATABASE = {
  UNIQUE_CONSTRAINT_VIOLATION_CODE: '23505'
};

// User defaults
export const USER_DEFAULTS = {
  IS_ACTIVE: true
};

