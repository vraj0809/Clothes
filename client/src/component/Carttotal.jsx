import { useContext } from "react";
import { shopdatacontext } from "../context/contexts";
import Title from "./Title";

const Carttotal = () => {
  const { currency, delivery_fee, cartamount } = useContext(shopdatacontext);

  return (
    <div className="cartTotal">
      <div style={{ marginBottom: 12 }}>
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="cartTotal__row">
        <span>Subtotal</span>
        <span>{currency} {cartamount}.00</span>
      </div>

      <hr className="cartTotal__divider" />

      <div className="cartTotal__row">
        <span>Shipping Fee</span>
        <span>{currency} {delivery_fee}</span>
      </div>

      <hr className="cartTotal__divider" />

      <div className="cartTotal__row cartTotal__row--total">
        <span>Total</span>
        <span>{currency} {cartamount === 0 ? 0 : cartamount + delivery_fee}</span>
      </div>
    </div>
  );
};

export default Carttotal;