export default function errorMiddleware(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
}
