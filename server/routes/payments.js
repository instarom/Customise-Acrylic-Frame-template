const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @route POST /api/payments/create-order
// @desc Create Razorpay order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${orderId}`,
      notes: {
        orderId: orderId
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update order with Razorpay order ID
    await Order.findByIdAndUpdate(orderId, {
      razorpayOrderId: razorpayOrder.id
    });

    res.json({
      orderId: razorpayOrder.id,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route POST /api/payments/verify
// @desc Verify Razorpay payment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    // Verify signature
    const hmac = require('crypto').createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    // Update order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: 'completed',
        orderStatus: 'confirmed',
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({
      message: 'Payment verified successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route GET /api/payments/order/:orderId
// @desc Get payment details
router.get('/order/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      orderId: order.razorpayOrderId,
      paymentId: order.razorpayPaymentId,
      paymentStatus: order.paymentStatus,
      amount: order.totalAmount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
