const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');

// @route GET /api/products
// @desc Get all products with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category, productType, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

    let filter = { status: 'active' };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) filter.category = category;
    if (productType) filter.productType = productType;
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/products/:id
// @desc Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/products
// @desc Create new product (Admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { name, description, category, productType, images, price, dimensions, material, color, stock, customizationOptions } = req.body;

    const product = new Product({
      name,
      description,
      category,
      productType,
      images,
      thumbnail: images[0],
      price,
      dimensions,
      material,
      color,
      stock,
      customizationOptions,
      createdBy: req.userId
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route PUT /api/products/:id
// @desc Update product (Admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route DELETE /api/products/:id
// @desc Delete product (Admin only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/products/:id/review
// @desc Add review to product
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const user = await require('../models/User').findById(req.userId);

    product.reviews.push({
      userId: req.userId,
      userName: user.name,
      rating,
      comment
    });

    // Update average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / product.reviews.length;

    await product.save();
    res.json({ message: 'Review added successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
