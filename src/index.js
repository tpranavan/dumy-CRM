import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { initDatabase, closeDatabase } from './config/database.js';
import { swaggerConfig, swaggerUiConfig } from './config/swagger.js';
import { corsConfig } from './common/config/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';
import authRoutes from './backend/auth/routes/auth.routes.js';

// Load environment variables
dotenv.config();

/**
 * Create and configure Fastify instance
 */
async function buildApp() {
  const fastify = Fastify({
    logger: false, // We use our custom logger
    ajv: {
      customOptions: {
        strict: false, // Allow 'example' keyword in schemas
        removeAdditional: false
      }
    }
  });

  // Register CORS
  await fastify.register(cors, corsConfig);

  // Register Swagger
  await fastify.register(swagger, swaggerConfig);
  await fastify.register(swaggerUi, swaggerUiConfig);

  // Register error handler
  fastify.setErrorHandler(errorHandler);

  // Register routes
  await fastify.register(authRoutes, { prefix: '/api/auth' });

  // Health check endpoint
  fastify.get('/health', {
    schema: {
      description: 'Health check endpoint',
      tags: ['Health'],
      summary: 'Check API health',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  return fastify;
}

/**
 * Start the server
 */
async function start() {
  try {
    // Initialize database
    initDatabase();

    // Build and start Fastify app
    const app = await buildApp();
    const host = process.env.HOST || '0.0.0.0';
    const port = parseInt(process.env.PORT || '3000', 10);

    await app.listen({ host, port });

    logger.info(`Server is running on http://${host}:${port}`);
    logger.info(`Swagger documentation available at http://${host}:${port}/docs`);

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      await app.close();
      await closeDatabase();
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Error starting server', error);
    process.exit(1);
  }
}

// Start the application
start();

