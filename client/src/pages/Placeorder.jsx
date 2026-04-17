import { useContext, useState } from "react";
import Title from "../component/Title";
import Carttotal from "../component/Carttotal";
import rozerpay from "../assets/Razorpay_logo.webp"
import { shopdatacontext, authDataContext } from "../context/contexts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Placeorder = () => {

  let [method, setMethod] = useState("cod")

  let [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  })

  const navigate = useNavigate()

  let { serverurl } = useContext(authDataContext)

  const { cartitem, setCartitem, cartamount, delivery_fee, products } = useContext(shopdatacontext)

  const onchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormdata((data) => ({ ...data, [name]: value }))
  }

  const initpay = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order payment',
      description: 'order payment',
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {

        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        }

        const { data } = await axios.post(
          `${serverurl}/api/order/verifyrazorpay`,
          verifyData,
          { withCredentials: true }
        )

        if (data.success) {
          navigate("/order")
          setCartitem({})
        } else {
          alert("payment verification failed")
        }

      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }


  const onsubmit = async (e) => {
    e.preventDefault();

    try {

      let orderitem = []

      for (const items in cartitem) {

        for (const item in cartitem[items]) {

          if (cartitem[items][item] > 0) {

            const iteminfo = structuredClone(
              products.find(product => product._id === items)
            )

            if (iteminfo) {
              iteminfo.size = item
              iteminfo.quentity = cartitem[items][item]
              orderitem.push(iteminfo)
            }
          }
        }
      }

      let orderdata = {
        address: formdata,
        items: orderitem,
        amount: cartamount + delivery_fee
      }

      switch (method) {

        case "cod":
          {
            const result = await axios.post(
              `${serverurl}/api/order/placeorder`,
              orderdata,
              { withCredentials: true }
            )
            console.log(result.data)

            if (result.data) {
              setCartitem({});
              navigate("/order")
            } else {
              console.log(result.data.message)
            }
            break;
          }


        case 'razorpay':
          {
            const resultrazorpay = await axios.post(
              `${serverurl}/api/order/placeorderbyrazorpay`,
              orderdata,
              { withCredentials: true }
            )
            console.log("razorpay detail", resultrazorpay.data)   // FIXED VARIABLE
            console.log("order razorpay", resultrazorpay.data)
            if (resultrazorpay.data) {
              initpay(resultrazorpay.data)   // PASS ORDER OBJECT
            }
            break;
          }

        default:
          break;
      }

    } catch (error) {
      console.log("razorpay error", error.response.data)
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="checkoutLayout">
          <div className="checkoutCard">
            <div style={{ paddingBottom: 10 }}>
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>

            <form onSubmit={onsubmit} className="form">
              <div className="formGrid2">
                <input type="text" placeholder="First name" onChange={onchange} name="firstname" value={formdata.firstname} className="input" required />
                <input type="text" placeholder="Last name" onChange={onchange} name="lastname" value={formdata.lastname} className="input" required />
              </div>

              <input type="text" placeholder="Email address" onChange={onchange} name="email" value={formdata.email} className="input" required />
              <input type="text" placeholder="Street" onChange={onchange} name="street" value={formdata.street} className="input" required />

              <div className="formGrid2">
                <input type="text" placeholder="City" onChange={onchange} name="city" value={formdata.city} className="input" required />
                <input type="text" placeholder="State" onChange={onchange} name="state" value={formdata.state} className="input" required />
              </div>

              <div className="formGrid2">
                <input type="number" placeholder="Pincode" onChange={onchange} name="pincode" value={formdata.pincode} className="input" required />
                <input type="text" placeholder="Country" onChange={onchange} name="country" value={formdata.country} className="input" required />
              </div>

              <input type="text" placeholder="Phone" onChange={onchange} name="phone" value={formdata.phone} className="input" required />

              <button type="submit" className="primaryBtn">
                Place order
              </button>
            </form>
          </div>

          <div className="checkoutCard">
            <Carttotal />

            <div style={{ paddingTop: 14 }}>
              <Title text1={"PAYMENT"} text2={"METHOD"} />
            </div>

            <div className="radioRow" style={{ marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`payOption ${method === "razorpay" ? "payOption--active" : ""}`}
              >
                <span className="payOption__left">Razorpay</span>
                <img src={rozerpay} className="payLogo" alt="Razorpay" loading="lazy" decoding="async" />
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`payOption ${method === "cod" ? "payOption--active" : ""}`}
              >
                <span className="payOption__left">Cash on delivery</span>
                <span style={{ color: "rgba(255,255,255,.70)" }}>COD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Placeorder;