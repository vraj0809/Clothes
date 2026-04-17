import { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopdatacontext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Carttotal from "../component/Carttotal";
import { toast } from "react-toastify";

const CartItemQuantity = ({ item, productdata, isPending, doUpdate }) => {
  const [localVal, setLocalVal] = useState(String(item.quantity).padStart(2, '0'));

  useEffect(() => {
    setLocalVal(String(item.quantity).padStart(2, '0'));
  }, [item.quantity]);

  const handleBlur = () => {
    let finalQty = Number(localVal);
    if (!finalQty || finalQty < 1) {
      setLocalVal(String(item.quantity).padStart(2, '0'));
    } else if (finalQty !== item.quantity) {
      doUpdate(item._id, item.size, finalQty);
    } else {
      setLocalVal(String(item.quantity).padStart(2, '0'));
    }
  };

  return (
    <div className="qty__controls">
      <button
        type="button"
        className="qty__btn"
        disabled={isPending || item.quantity <= 1}
        aria-label={`Decrease quantity for ${productdata.name}`}
        onClick={() => doUpdate(item._id, item.size, item.quantity - 1)}
      >
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={localVal}
        className="qty__input"
        disabled={isPending}
        aria-label={`Quantity for ${productdata.name}`}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '');
          setLocalVal(val);
        }}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="qty__btn"
        disabled={isPending}
        aria-label={`Increase quantity for ${productdata.name}`}
        onClick={() => doUpdate(item._id, item.size, item.quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

const Cart = () => {

  const { products, currency, cartitem, updateQuantity, getproducts } =
    useContext(shopdatacontext);

  useEffect(() => {
    getproducts();
  }, [getproducts]);

  const [cartdata, setCartdata] = useState([]);
  const [pendingKey, setPendingKey] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [productsById, setProductsById] = useState(new Map());

  const navigate = useNavigate();

  useEffect(() => {

    const tempData = [];

    for (const items in cartitem) {

      for (const item in cartitem[items]) {

        if (cartitem[items][item] > 0) {

          tempData.push({
            _id: items,
            size: item,
            quantity: cartitem[items][item],
          });

        }

      }

    }

    setCartdata(tempData);

  }, [cartitem]);

  useEffect(() => {
    const map = new Map()
    for (const p of products) map.set(p._id, p)
    setProductsById(map)
  }, [products])

  const openRemoveConfirm = (item, productdata) => {
    setConfirm({ _id: item._id, size: item.size, name: productdata?.name || "this item" })
  }

  const doUpdate = async (itemid, size, quantity) => {
    const key = `${itemid}:${size}`
    setPendingKey(key)
    try {
      await updateQuantity(itemid, size, quantity)
      if (quantity === 0) toast.success("Removed from cart")
    } finally {
      setPendingKey(null)
    }
  }

  return (

    <div className="page cartPage">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        {cartdata.length === 0 ? (
          <div className="emptyState">
            <div style={{ fontWeight: 850, fontSize: 18, marginBottom: 6 }}>Your cart is empty</div>
            <div style={{ marginBottom: 14, color: "rgba(255,255,255,.70)" }}>
              Browse the latest collections and add items to your cart.
            </div>
            <button className="cartCta" onClick={() => navigate("/collection")}>
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cartList" aria-label="Cart items">
              {cartdata.map((item, index) => {
                const productdata = productsById.get(item._id)
                if (!productdata) return null

                const key = `${item._id}:${item.size}`
                const isPending = pendingKey === key

                return (
                  <div key={index} className="cartItem">
                    <img className="cartItem__img" src={productdata.image1} alt={productdata.name} loading="lazy" decoding="async" />

                    <div className="cartItem__info">
                      <div className="cartItem__name">{productdata.name}</div>
                      <div className="cartItem__meta">
                        <div className="cartItem__price">
                          {currency} {productdata.price}
                        </div>
                        <div className="cartItem__size" aria-label={`Size ${item.size}`}>
                          {item.size}
                        </div>
                      </div>
                    </div>

                    <div className="qty">
                      <CartItemQuantity
                        item={item}
                        productdata={productdata}
                        isPending={isPending}
                        doUpdate={doUpdate}
                      />

                      <button
                        className="qty__remove"
                        type="button"
                        disabled={isPending}
                        aria-label={`Remove ${productdata.name}`}
                        onClick={() => openRemoveConfirm(item, productdata)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              <div style={{ maxWidth: 520 }}>
                <Carttotal />
              </div>

              <button
                className="cartCta"
                onClick={() => {
                  if (cartdata.length > 0) navigate("/placeorder");
                }}
                disabled={cartdata.length === 0}
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}

        {confirm && (
          <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Remove item confirmation">
            <div className="modal">
              <div className="modal__title">Remove item?</div>
              <div className="modal__body">
                Remove <b>{confirm.name}</b> (size <b>{confirm.size}</b>) from your cart?
              </div>
              <div className="modal__actions">
                <button className="btn" type="button" onClick={() => setConfirm(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn--danger"
                  type="button"
                  onClick={async () => {
                    const { _id, size } = confirm
                    setConfirm(null)
                    await doUpdate(_id, size, 0)
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );

};

export default Cart;
