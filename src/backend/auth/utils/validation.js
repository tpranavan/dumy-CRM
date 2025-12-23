import { ZodError } from 'zod';
import { ValidationException } from '../exceptions/ValidationException.js';

/**
 * Validates data against a Zod schema and throws ValidationException if invalid
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {any} - Validated data
 * @throws {ValidationException}
 */
export function validate(schema, data) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      throw new ValidationException('Validation failed', details);
    }
    throw error;
  }
}

