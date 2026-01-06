import productService from '../services/product.service.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const result = await productService.getProducts(req.query);
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);

    res.json({
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
