import { openApiSchemas } from './openapi-schemas.js';

/**
 * Swagger/OpenAPI configuration
 * OpenAPI 3.0 compliant configuration with standard schemas
 */
export const swaggerConfig = {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Dumy CRM API',
      description: 'Node.js microservice API with Fastify, PostgreSQL, and Drizzle ORM',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server'
      },
      {
        url: 'https://api.example.com',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Health',
        description: 'Health check and system status endpoints'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token authentication'
        }
      },
      schemas: openApiSchemas
    }
  }
};

export const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  }
};

