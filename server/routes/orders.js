const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth, adminOnly } = require('../middleware/auth');

// @route POST /api/orders
// @desc Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress, shippingCost, tax, paymentMethod } = req.body;

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = subtotal + (shippingCost || 0) + (tax || 0);

    const order = new Order({
      userId: req.userId,
      items,
      shippingAddress,
      subtotal,
      shippingCost: shippingCost || 0,
      tax: tax || 0,
      totalAmount,
      paymentMethod
    });

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/orders
// @desc Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/orders/:id
// @desc Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route PUT /api/orders/:id
// @desc Update order status (Admin only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, trackingNumber, updatedAt: Date.now() },
      { new: true }
    );

    res.json({ message: 'Order updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/orders/admin/all
// @desc Get all orders (Admin only)
router.get('/admin/all', auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
