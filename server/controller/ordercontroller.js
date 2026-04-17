import Order from "../model/Order-model.js";
import User from "../model/user-model.js"
import Product from "../model/product-model.js";
import Razorpay from "razorpay"
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config()
const razorpayInstance = new Razorpay(
  {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  }
)
export const Placeorder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId
    const orderdata = {
      items,
      amount,
      userId,
      address,
      paymentmethod: 'COD',
      payment: false,
      date: Date.now()
    }
    const neworder = new Order(orderdata)
    await neworder.save()

    for (const item of items) {
      const sizeKey = item.size.toUpperCase();
      await Product.findByIdAndUpdate(item._id, { $inc: { [`numberofproducts.${sizeKey}`]: -item.quentity } });
    }

    await User.findByIdAndUpdate(userId, {
      cartdata: {}
    })
    return res.status(201).json({ message: 'Order placed' })
  } catch (error) {
    console.log("SERVER ERROR:", error)
    return res.status(400).json({ message: 'error in razorpayment' })
  }
}

export const userorder = async (req, res) => {
  try {
    const userId = req.userId
    const orders = await Order.find({ userId })
    return res.status(201).json(orders)
  } catch (error) {
    return res.status(500).json({ message: error in userorder })
  }
}

export const adminallorder = async (req, res) => {
  try {
    const orders = await Order.find({})
    return res.status(201).json(orders)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error in order get admin" })
  }
}

export const updatestatus = async (req, res) => {

  try {
    const { orderId, status } = req.body
    
    const updateData = { status }
    if (status === "Delivered") {
      updateData.payment = true
    }

    await Order.findByIdAndUpdate(orderId, updateData)
    return res.status(201).json({ message: "status updated" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "status update error admin" })
  }
}

export const placeorderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId

    const orderdata = {
      items,
      amount,
      userId,
      address,
      paymentmethod: 'Razorpay',
      payment: false,
      date: Date.now(),
    }
    const neworder = new Order(orderdata)
    await neworder.save()
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: neworder._id.toString()
    }
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(500).json({ message: 'error in razorpayment' })
      }
      return res.status(201).json(order)
    })
  } catch (error) {
    return res.status(400).json({ message: 'error in razorpayment', error })
  }
}

export const verifyrazorpay = async (req, res) => {
  try {

    const userId = req.userId

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {

      const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)

      await Order.findByIdAndUpdate(orderinfo.receipt, {
        payment: true
      })

      const orderData = await Order.findById(orderinfo.receipt);
      if (orderData) {
        for (const item of orderData.items) {
          const sizeKey = item.size.toUpperCase();
          await Product.findByIdAndUpdate(item._id, { $inc: { [`numberofproducts.${sizeKey}`]: -item.quentity } });
        }
      }

      await User.findByIdAndUpdate(userId, {
        cartdata: {}
      })

      return res.status(200).json({
        success: true,
        message: "payment successful"
      })

    } else {

      return res.status(400).json({
        success: false,
        message: "payment verification failed"
      })

    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "payment verify error"
    })
  }
}

export const orderfilterforadmin = async (req, res) => {
  try {
    const { search, status, date } = req.query;
    const filter = {};

    if (search) {
      const users = await User.find({
        email: { $regex: search, $options: "i" },
      });
      const userIds = users.map((u) => u._id.toString());
      filter.userId = { $in: userIds };
    }

    if (status) {
      filter.status = status;
    }

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const orders = await Order.find(filter);
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error filtering orders" });
  }
};
