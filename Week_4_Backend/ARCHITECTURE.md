Backend Architecture — Day 1
Overview

This backend is implemented as a long-running Node.js process with controlled startup, environment-driven configuration, and graceful shutdown.

Folder Structure

src/
├── config/  
 |--- index.js # Environment configuration & validation
├── loaders/  
 |--- app.js # startup loader app
|--- db.js # startup loader db

├── models/ # Database schemas
├── routes/ # Route definitions
├── controllers/ # Request handlers
├── services/ # Business logic
├── repositories/ # Database access layer
├── middlewares/ # Express middlewares
├── utils/  
 |--- logger.js # shared logger
├── jobs/ # Background jobs
├── logs/ # Log output
└── index.js # Application entry point

Startup Flow

1. Load and validate environment configuration
2. Initialize structured logger
3. Create Express application
4. Register middlewares
5. Connect to MongoDB
6. Mount routes
7. Start HTTP server
8. The server starts listening only after all dependencies are ready.

The server starts listening only after all dependencies are ready.

Configuration

All behavior is controlled through environment variables using .env.local, .env.dev, and .env.prod.
Invalid or missing configuration causes the application to fail fast during startup.

Lifecycle Management

The application listens for OS shutdown signals (SIGINT, SIGTERM) to:

Stop accepting new requests
Close database connections
Exit cleanly

Design Principles

Environment-driven configuration
Loader-based startup
Fail-fast initialization
Centralized lifecycle control
