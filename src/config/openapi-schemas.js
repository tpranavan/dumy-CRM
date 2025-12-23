/**
 * OpenAPI 3.0 reusable schemas/components
 * Standard schemas for consistent API documentation
 */

export const openApiSchemas = {
  // User schemas
  User: {
    type: 'object',
    required: ['id', 'email', 'isActive', 'createdAt', 'updatedAt'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique user identifier',
        example: '123e4567-e89b-12d3-a456-426614174000'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'user@example.com'
      },
      firstName: {
        type: 'string',
        nullable: true,
        description: 'User first name',
        example: 'John'
      },
      lastName: {
        type: 'string',
        nullable: true,
        description: 'User last name',
        example: 'Doe'
      },
      isActive: {
        type: 'boolean',
        description: 'User account active status',
        example: true
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'User creation timestamp',
        example: '2024-01-15T10:30:00Z'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'User last update timestamp',
        example: '2024-01-15T10:30:00Z'
      }
    }
  },

  // Request schemas
  SignUpRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'user@example.com'
      },
      password: {
        type: 'string',
        minLength: 8,
        description: 'User password (minimum 8 characters)',
        example: 'SecurePass123!'
      },
      firstName: {
        type: 'string',
        nullable: true,
        description: 'User first name (optional)',
        example: 'John'
      },
      lastName: {
        type: 'string',
        nullable: true,
        description: 'User last name (optional)',
        example: 'Doe'
      }
    }
  },

  SignInRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'User email address',
        example: 'user@example.com'
      },
      password: {
        type: 'string',
        description: 'User password',
        example: 'SecurePass123!'
      }
    }
  },

  // Response schemas
  UserResponse: {
    type: 'object',
    required: ['success', 'message', 'data'],
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      message: {
        type: 'string',
        example: 'User created successfully'
      },
      data: {
        type: 'object',
        required: ['id', 'email', 'isActive', 'createdAt', 'updatedAt'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Unique user identifier',
            example: '123e4567-e89b-12d3-a456-426614174000'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
            example: 'user@example.com'
          },
          firstName: {
            type: 'string',
            nullable: true,
            description: 'User first name',
            example: 'John'
          },
          lastName: {
            type: 'string',
            nullable: true,
            description: 'User last name',
            example: 'Doe'
          },
          isActive: {
            type: 'boolean',
            description: 'User account active status',
            example: true
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'User creation timestamp',
            example: '2024-01-15T10:30:00Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'User last update timestamp',
            example: '2024-01-15T10:30:00Z'
          }
        }
      }
    }
  },

  // Error schemas
  ErrorResponse: {
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'object',
        required: ['message', 'code', 'statusCode'],
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'An error occurred'
          },
          code: {
            type: 'string',
            description: 'Error code',
            example: 'INTERNAL_ERROR'
          },
          statusCode: {
            type: 'number',
            description: 'HTTP status code',
            example: 500
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Error timestamp (optional)',
            example: '2024-01-15T10:30:00Z'
          },
          details: {
            type: 'array',
            description: 'Additional error details (optional)',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  example: 'email'
                },
                message: {
                  type: 'string',
                  example: 'Invalid email format'
                }
              },
              required: ['field', 'message']
            }
          },
          stack: {
            type: 'string',
            description: 'Error stack trace (development only)',
            example: 'Error: ...'
          }
        },
        additionalProperties: true
      }
    }
  },

  ValidationErrorResponse: {
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'object',
        required: ['message', 'code', 'statusCode', 'details'],
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Validation failed'
          },
          code: {
            type: 'string',
            description: 'Error code',
            example: 'VALIDATION_ERROR'
          },
          statusCode: {
            type: 'number',
            description: 'HTTP status code',
            example: 400
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Error timestamp (optional)',
            example: '2024-01-15T10:30:00Z'
          },
          details: {
            type: 'array',
            description: 'Validation error details',
            items: {
              type: 'object',
              required: ['field', 'message'],
              properties: {
                field: {
                  type: 'string',
                  description: 'Field name with validation error',
                  example: 'email'
                },
                message: {
                  type: 'string',
                  description: 'Validation error message',
                  example: 'Invalid email format'
                }
              },
              additionalProperties: false
            }
          }
        },
        additionalProperties: true
      }
    }
  },

  ConflictErrorResponse: {
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'object',
        required: ['message', 'code', 'statusCode'],
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'User with this email already exists'
          },
          code: {
            type: 'string',
            description: 'Error code',
            example: 'CONFLICT'
          },
          statusCode: {
            type: 'number',
            description: 'HTTP status code',
            example: 409
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Error timestamp',
            example: '2024-01-15T10:30:00Z'
          }
        }
      }
    }
  },

  UnauthorizedErrorResponse: {
    type: 'object',
    required: ['error'],
    properties: {
      error: {
        type: 'object',
        required: ['message', 'code', 'statusCode'],
        properties: {
          message: {
            type: 'string',
            description: 'Error message',
            example: 'Invalid email or password'
          },
          code: {
            type: 'string',
            description: 'Error code',
            example: 'UNAUTHORIZED'
          },
          statusCode: {
            type: 'number',
            description: 'HTTP status code',
            example: 401
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Error timestamp',
            example: '2024-01-15T10:30:00Z'
          }
        }
      }
    }
  }
};

