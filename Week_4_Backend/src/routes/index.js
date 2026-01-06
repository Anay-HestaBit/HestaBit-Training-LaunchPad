import productRoutes from './product.routes.js';

export default function mountRoutes(app) {
  app.use('/products', productRoutes);

  return 1; // number of route groups mounted
}
