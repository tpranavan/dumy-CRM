/**
 * CORS configuration for deployment
 * Common CORS settings used across the application
 */
function getCorsOrigin() {
  // In development, allow all origins for easier testing
  if (process.env.NODE_ENV === 'development') {
    return true; // Allow all origins in development
  }

  // In production, use configured origins
  if (process.env.CORS_ORIGIN) {
    const origins = process.env.CORS_ORIGIN.split(',').map(o => o.trim());
    // If '*' is specified, allow all
    if (origins.includes('*')) {
      return true;
    }
    return origins;
  }

  // Default allowed origins
  return ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'];
}

export const corsConfig = {
  origin: getCorsOrigin(),
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Total-Count'
  ],
  credentials: true,
  maxAge: 86400 // 24 hours (preflight cache)
};

