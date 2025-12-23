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
        201: openApiSchemas.UserResponse
      }
    },
    attachValidation: true
  }, authController.signUp.bind(authController));

  // Sign in route
  fastify.post('/signin', {
    schema: {
      description: 'Authenticate user and sign in. Validates email and password credentials.',
      tags: ['Authentication'],
      summary: 'User sign in',
      body: openApiSchemas.SignInRequest,
      response: {
        200: openApiSchemas.UserResponse
      }
    },
    attachValidation: true
  }, authController.signIn.bind(authController));
}

export default authRoutes;

