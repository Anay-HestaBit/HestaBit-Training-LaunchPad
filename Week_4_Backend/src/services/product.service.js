import productRepo from '../repositories/product.repository.js';
import AppError from '../utils/appError.js';

class ProductService {
  async createProduct(payload) {
    const { name, price } = payload;

    if (!name || price == null) {
      throw new AppError(
        'Product name and price are required',
        400,
        'VALIDATION_ERROR'
      );
    }

    return productRepo.create(payload);
  }

  async getProducts(queryParams) {
    const { page = 1, limit = 10, includeDeleted = false } = queryParams;

    const query = {};

    // soft delete safety
    if (!includeDeleted) {
      query.deletedAt = null;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      productRepo.find(query, {
        sort: { createdAt: -1 },
        skip,
        limit: Number(limit),
      }),
      productRepo.count(query),
    ]);

    return {
      items,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  }

  async deleteProduct(id) {
    const product = await productRepo.findById(id);

    if (!product) {
      throw new AppError('Product Not Found', 404, 'PRODUCT_NOT_FOUND');
    }
    if (product.deletedAt) {
      throw new AppError(
        'Product already deleted',
        400,
        'PRODUCT_ALREADY_DELETED'
      );
    }
    return productRepo.softDelete(id);
  }
  async getProducts(queryParams) {
    const {
      page = 1,
      limit = 10,
      includeDeleted = false,
      search,
      minPrice,
      maxPrice,
      tags,
      sort,
    } = queryParams;

    // service describes WHAT we want
    const filters = {
      includeDeleted,
      search,
      minPrice,
      maxPrice,
      tags,
    };

    const options = {
      page: Number(page),
      limit: Number(limit),
      sort,
    };

    const { items, total } = await productRepo.findWithFilters(
      filters,
      options
    );

    return {
      items,
      meta: {
        total,
        page: options.page,
        limit: options.limit,
      },
    };
  }
}

export default new ProductService();
