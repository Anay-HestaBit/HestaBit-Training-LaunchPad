import Product from '../models/Product.js';

class ProductRepository {
  async findWithFilters(filters, options) {
    const query = {};

    if (!filters.includeDeleted) {
      query.deletedAt = null;
    }

    if (filters.search) {
      query.$or = [
        { name: new RegExp(filters.search, 'i') },
        { description: new RegExp(filters.search, 'i') },
      ];
    }

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
    }

    if (filters.tags) {
      query.tags = { $in: filters.tags.split(',') };
    }

    let sortObj = { createdAt: -1 };
    if (options.sort) {
      const [field, order] = options.sort.split(':');
      sortObj = { [field]: order === 'desc' ? -1 : 1 };
    }

    const skip = (options.page - 1) * options.limit;

    const [items, total] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(options.limit),
      Product.countDocuments(query),
    ]);

    return { items, total };
  }

  findById(id) {
    return Product.findById(id);
  }

  softDelete(id) {
    return Product.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  }

  create(data) {
    return Product.create(data);
  }
}

export default new ProductRepository();
