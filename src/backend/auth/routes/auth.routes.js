import { openApiSchemas } from '../../../config/openapi-schemas.js';

/**
 * Auth routes with Swagger documentation
 */
async function authRoutes(fastify, options) {
  const { authController } = await import('../controller/auth.controller.js');

  // Sign up route
  fastify.post('/signup', {
    schema: {
      description: 'Register a new user account. Creates a new user with email and password.',
      tags: ['Authentication'],
      summary: 'User sign up',
      body: openApiSchemas.SignUpRequest,
      response: {
        201: {
          description: 'User created successfully',
          ...openApiSchemas.UserResponse
        },
        400: {
          description: 'Validation error - Invalid request data',
          ...openApiSchemas.ValidationErrorResponse
        },
        409: {
          description: 'Conflict - User with this email already exists',
          ...openApiSchemas.ConflictErrorResponse
        },
        500: {
          description: 'Internal server error',
          ...openApiSchemas.ErrorResponse
        }
      }
    }
  }, authController.signUp.bind(authController));

  // Sign in route
  fastify.post('/signin', {
    schema: {
      description: 'Authenticate user and sign in. Validates email and password credentials.',
      tags: ['Authentication'],
      summary: 'User sign in',
      body: openApiSchemas.SignInRequest,
      response: {
        200: {
          description: 'Sign in successful',
          ...openApiSchemas.UserResponse
        },
        400: {
          description: 'Validation error - Invalid request data',
          ...openApiSchemas.ValidationErrorResponse
        },
        401: {
          description: 'Unauthorized - Invalid credentials or inactive account',
          ...openApiSchemas.UnauthorizedErrorResponse
        },
        500: {
          description: 'Internal server error',
          ...openApiSchemas.ErrorResponse
        }
      }
    }
  }, authController.signIn.bind(authController));
}

export default authRoutes;

