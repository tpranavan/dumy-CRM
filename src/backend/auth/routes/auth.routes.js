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
      body: {
        $ref: '#/components/schemas/SignUpRequest'
      },
      response: {
        201: {
          description: 'User created successfully',
          $ref: '#/components/schemas/UserResponse'
        },
        400: {
          description: 'Validation error - Invalid request data',
          $ref: '#/components/schemas/ValidationErrorResponse'
        },
        409: {
          description: 'Conflict - User with this email already exists',
          $ref: '#/components/schemas/ConflictErrorResponse'
        },
        500: {
          description: 'Internal server error',
          $ref: '#/components/schemas/ErrorResponse'
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
      body: {
        $ref: '#/components/schemas/SignInRequest'
      },
      response: {
        200: {
          description: 'Sign in successful',
          $ref: '#/components/schemas/UserResponse'
        },
        400: {
          description: 'Validation error - Invalid request data',
          $ref: '#/components/schemas/ValidationErrorResponse'
        },
        401: {
          description: 'Unauthorized - Invalid credentials or inactive account',
          $ref: '#/components/schemas/UnauthorizedErrorResponse'
        },
        500: {
          description: 'Internal server error',
          $ref: '#/components/schemas/ErrorResponse'
        }
      }
    }
  }, authController.signIn.bind(authController));
}

export default authRoutes;

