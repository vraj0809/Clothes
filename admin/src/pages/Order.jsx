import { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Authdatacontext } from "../context/Authcontext";
import axios from "axios";
import { SiEbox } from "react-icons/si";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { serverurl } = useContext(Authdatacontext);

  const fetchdata = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchFilter) queryParams.append("search", searchFilter);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (dateFilter) queryParams.append("date", dateFilter);

      const endpoint = queryParams.toString() 
        ? `${serverurl}/api/order/orderfilterforadmin?${queryParams.toString()}`
        : `${serverurl}/api/order/allorders`;

      const result = await axios.get(endpoint, { withCredentials: true });
      if (Array.isArray(result.data)) {
        setOrders([...result.data].reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statushandler = async (e, orderId) => {
    try {
      const result = await axios.patch(
        `${serverurl}/api/order/updatestatus`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      );
      if (result.data) {
        fetchdata();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [searchFilter, statusFilter, dateFilter, serverurl]);

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">All Orders</h1>

        <div className="admin-filter-bar">
          <input
            type="text"
            placeholder="Search by email..."
            className="admin-form__input admin-filter-input"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <select
            className="admin-form__select admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          <input
            type="date"
            className="admin-form__input admin-filter-date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <div className="admin-order-list">
          {orders.map((order, index) => (
            <div key={index} className="admin-order-card">
              <div className="admin-order-card__icon">
                <SiEbox style={{ width: '100%', height: '100%' }} />
              </div>

              {/* Items + Address */}
              <div>
                <div className="admin-order-card__items">
                  {order.items?.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quentity}
                      <span style={{ marginLeft: 6, color: '#888' }}>{item.size}</span>
                    </p>
                  ))}
                </div>
                <div className="admin-order-card__address">
                  <p>{order.address?.firstName} {order.address?.lastName}</p>
                  <p>{order.address?.street}</p>
                  <p>{order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.pinCode}</p>
                  <p>{order.address?.phone}</p>
                </div>
              </div>

              {/* Payment details */}
              <div className="admin-order-card__details">
                <p>Items: {order.items?.length}</p>
                <p>Method: {order.paymentmethod || order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="admin-order-card__amount">₹ {order.amount}</p>
              </div>

              {/* Status */}
              <select
                value={order.status}
                onChange={(e) => statushandler(e, order._id)}
                className="admin-order-card__status"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
          {orders.length === 0 && (
             <p className="admin-order-empty">No orders found matching the filters.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Order;