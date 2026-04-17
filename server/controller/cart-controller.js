import User from "../model/user-model.js"
import Product from "../model/product-model.js";
export const addtocart = async (req, res) => {
  try {
    const { itemid, size } = req.body
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(400).json({ message: "user not found" })
    }

    const product = await Product.findById(itemid)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    let cartdata = user.cartdata || {}
    let currentQty = (cartdata[itemid] && cartdata[itemid][size]) ? cartdata[itemid][size] : 0

    const stock = product.numberofproducts?.[size.toUpperCase()] || 0
    if (currentQty + 1 > stock) {
      return res.status(200).json({ success: false, message: `Only ${stock} items available in stock for size ${size}` })
    }

    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      }
      else {
        cartdata[itemid][size] = 1;
      }
    }
    else {
      cartdata[itemid] = {}
      cartdata[itemid][size] = 1;
    }
    await User.findByIdAndUpdate(req.userId, { cartdata })
    return res.status(201).json({ message: "Added to Cart", success: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error in cart add", success: false })
  }
}

export const updatecart = async (req, res) => {
  try {
    const { itemid, size, quantity } = req.body
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    if (quantity > 0) {
      const product = await Product.findById(itemid)
      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }
      const stock = product.numberofproducts?.[size.toUpperCase()] || 0
      if (quantity > stock) {
        return res.status(200).json({ success: false, message: `Only ${stock} items available in stock for size ${size}` })
      }
    }

    let cartdata = user.cartdata
    cartdata[itemid][size] = quantity
    await User.findByIdAndUpdate(req.userId, { cartdata })
    return res.status(201).json({ message: "Cart updated", success: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error in Updatecart", success: false })
  }
}

export const usercart = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    let cartdata = user.cartdata || {};
    let removedItems = [];
    let totalAmount = 0;

    for (const productId in cartdata) {

      const product = await Product.findById(productId);

      if (!product) {
        delete cartdata[productId];
        continue;
      }

      for (const size in cartdata[productId]) {

        const quantity = cartdata[productId][size];

        if (!product.sizes.includes(size)) {

          removedItems.push({
            productId,
            size,
            message: "This size is no longer available"
          });

          delete cartdata[productId][size];
          continue;
        }

        if (quantity > 0) {
          totalAmount += product.price * quantity;
        }

      }

      if (Object.keys(cartdata[productId]).length === 0) {
        delete cartdata[productId];
      }

    }

    user.cartdata = cartdata;
    await user.save();

    return res.status(200).json({
      cartdata,
      removedItems,
      totalAmount
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Error in fetchcart"
    });

  }
};