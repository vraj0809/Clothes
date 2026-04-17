/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import { authDataContext as AuthDataContext, shopdatacontext as ShopDataContext, userDatacontext as UserDataContext } from "./contexts";
import axios from "axios";
import { toast } from "react-toastify";

const Shopcontext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [cartitem, setCartitem] = useState({});
  const [cartamount, setCartamount] = useState(0);
  const { serverurl } = useContext(AuthDataContext);
  const { user } = useContext(UserDataContext);

  const currency = "₹";
  const delivery_fee = 40;

  const getproducts = async () => {
    try {
      let result = await axios.get(`${serverurl}/api/product/listproduct`);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getusercart = async () => {
    if (!user) return;

    try {

      const result = await axios.get(
        `${serverurl}/api/cart/get`,
        { withCredentials: true }
      );

      setCartitem(result.data.cartdata);
      setCartamount(result.data.totalAmount);

    } catch (error) {
      console.log("error in get cart", error);
    }
  };

  const addtocart = async (itemid, size) => {
    if (!user) {
      toast.error("You have to login for access");
      return false;
    }
    if (!size) {
      toast.error("Please select product size");
      return;
    }

    const product = products.find((p) => p._id === itemid);
    if (!product) {
      toast.error("Product not found");
      return;
    }

    const stock = product.numberofproducts?.[size.toUpperCase()] || 0;
    const currentQty = cartitem[itemid]?.[size] || 0;

    if (currentQty + 1 > stock) {
      toast.error(`Only ${stock} items available in stock for size ${size}`);
      return false;
    }

    let cartdata = structuredClone(cartitem);

    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      } else {
        cartdata[itemid][size] = 1;
      }
    } else {
      cartdata[itemid] = {};
      cartdata[itemid][size] = 1;
    }

    setCartitem(cartdata);
    toast.success("Added to cart");

    if (user) {
      try {
        const response = await axios.post(
          `${serverurl}/api/cart/add`,
          { itemid, size },
          { withCredentials: true }
        );
        if (response.data && response.data.success === false) {
          toast.error(response.data.message || "Failed to add to cart");
          setCartitem(cartitem);
          return false;
        }
      } catch (error) {
        console.log("error in add cart", error);
        toast.error(error.response?.data?.message || "Error adding to cart");
        setCartitem(cartitem);
        return false;
      }
    }
    return true;
  };

  const updateQuantity = async (itemid, size, quantity) => {
    if (quantity > 0) {
      const product = products.find((p) => p._id === itemid);
      if (product) {
        const stock = product.numberofproducts?.[size.toUpperCase()] || 0;
        if (quantity > stock) {
          toast.error(`Only ${stock} items available in stock for size ${size}`);
          return false;
        }
      } else {
        toast.error("Product information not found. Please try again.");
        return false;
      }
    }

    const originalCart = structuredClone(cartitem);
    let cartdata = structuredClone(cartitem);
    cartdata[itemid][size] = quantity;
    setCartitem(cartdata);

    try {
      const response = await axios.patch(
        `${serverurl}/api/cart/update`,
        { itemid, size, quantity },
        { withCredentials: true }
      );
      if (response.data && response.data.success === false) {
        toast.error(response.data.message || "Failed to update cart");
        setCartitem(originalCart);
        return false;
      }
    } catch (error) {
      console.log("error in update cart", error);
      toast.error(error.response?.data?.message || "Error updating quantity");
      setCartitem(originalCart);
      return false;
    }
    return true;
  };

  const getcartcount = () => {
    let totalcount = 0;
    for (const items in cartitem) {
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          totalcount += cartitem[items][item];
        }
      }
    }
    return totalcount;
  };

  useEffect(() => {
    let totalAmount = 0;
    for (const items in cartitem) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartitem[items]) {
        if (cartitem[items][item] > 0) {
          totalAmount += itemInfo.price * cartitem[items][item];
        }
      }
    }
    setCartamount(totalAmount);
  }, [cartitem, products]);
  useEffect(() => {
    getproducts();

    const interval = setInterval(() => {
      getproducts();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getusercart();
  }, [user]);

  const value = {
    products,
    delivery_fee,
    currency,
    search,
    setSearch,
    showsearch,
    setShowsearch,
    addtocart,
    getcartcount,
    cartitem,
    setCartitem,
    updateQuantity,
    cartamount,
    getproducts
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default Shopcontext;
