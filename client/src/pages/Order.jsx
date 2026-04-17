import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shopdatacontext, authDataContext } from "../context/contexts";
import Title from "../component/Title";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const Order = () => {
  const [orderdata, setOrderdata] = useState([]);
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState({
    productId: null,
    rate: 0,
    comment: ""
  });

  const { currency, getproducts, delivery_fee } = useContext(shopdatacontext);
  const { serverurl } = useContext(authDataContext);

  const loadorder = async () => {
    try {
      const result = await axios.get(
        serverurl + "/api/order/userorders",
        { withCredentials: true }
      );

      if (result.data) {
        setOrderdata(result.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadorder();
  }, []);

  const submitRating = async () => {
    try {
      const { productId, rate, comment } = ratingData;

      if (!rate) return alert("Select rating first");

      await axios.post(
        `${serverurl}/api/product/rate/${productId}`,
        { rating: rate, comment },
        { withCredentials: true }
      );

      alert("Rating submitted!");
      getproducts();

      setRatingData({
        productId: null,
        rate: 0,
        comment: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div className="orderList" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {orderdata.map((order, index) => {
            const statusClass =
              order.status === "Delivered" ? "status--ok" : order.status === "Pending" ? "status--warn" : "status--bad";

            return (
              <div key={index} className="orderCard" style={{ display: "block", padding: "20px" }}>

                <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "15px", paddingBottom: "15px", borderBottom: i < order.items.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                      <button
                        type="button"
                        className="orderCard__imgWrap"
                        onClick={() => navigate(`/productdetail/${item._id}`)}
                        aria-label={`View product: ${item.name}`}
                        title="View product details"
                      >
                        <img
                          src={item.image1}
                          alt=""
                          className="orderCard__img orderCard__img--orderLine"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>

                      <div className="orderCard__meta" style={{ flex: 1 }}>
                        <div className="orderCard__name">{item.name}</div>
                        <div>Size: {item.size}</div>
                        <div>Quantity: {item.quentity || item.quantity}</div>
                        <div>Price: {currency}{item.price}</div>

                        {order.status === "Delivered" && (
                          <div style={{ marginTop: "12px" }}>
                            {ratingData.productId !== item._id ? (
                              <button
                                onClick={() =>
                                  setRatingData({ productId: item._id, rate: 0, comment: "" })
                                }
                                className="btn"
                                style={{ padding: "6px 12px", fontSize: "12px", height: "auto", marginTop: "10px" }}
                              >
                                Rate Product
                              </button>
                            ) : (
                              <div style={{ marginTop: "10px", padding: "12px", border: "1px solid #eee", borderRadius: "6px", backgroundColor: "#fafafa" }}>
                                <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                                  {[1, 2, 3, 4, 5].map((star) =>
                                    star <= ratingData.rate ? (
                                      <FaStar
                                        key={star}
                                        size={20}
                                        color="#FFD700"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setRatingData({ ...ratingData, rate: star })}
                                      />
                                    ) : (
                                      <CiStar
                                        key={star}
                                        size={20}
                                        color="#ccc"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setRatingData({ ...ratingData, rate: star })}
                                      />
                                    )
                                  )}
                                </div>

                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                  <input
                                    type="text"
                                    placeholder="Write a review..."
                                    value={ratingData.comment}
                                    onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                                    style={{ flex: 1, minWidth: "150px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", outline: "none" }}
                                  />
                                  <button onClick={submitRating} className="btn" style={{ padding: "8px 16px", height: "auto" }}>
                                    Submit
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "15px", gap: "15px", marginTop: "15px" }}>
                  <div className="orderCard__meta" style={{ flex: "none", color: "#333", alignSelf: "flex-end" }}>
                    <div className={`status ${statusClass}`} style={{ fontWeight: "bold" }}>Status: {order.status}</div>
                    <div style={{ marginTop: "5px" }}>Payment: <span style={{ fontWeight: "600", color: order.payment ? "green" : "red" }}>{order.paymentmethod} ({order.payment ? "Done" : "Pending"})</span></div>
                    <div style={{ marginTop: "5px" }}>Date: <span style={{ color: "#555", fontWeight: "500" }}>{new Date(order.date).toDateString()}</span></div>
                  </div>

                  <div className="orderCard__summary">
                    <div className="orderCard__summaryRow">
                      <span>Delivery Fee:</span>
                      <span className="orderCard__summaryVal">{currency}{delivery_fee}</span>
                    </div>
                    <div className="orderCard__summaryRow orderCard__summaryRow--total">
                      <span>Total Amount:</span>
                      <span className="orderCard__summaryVal">{currency}{order.amount}</span>
                    </div>
                    <button onClick={loadorder} className="btn orderCard__btn" type="button">
                      Refresh status
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;