import { useContext, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Authdatacontext } from "../context/Authcontext";
import { useEffect } from "react";
import axios from "axios"

const Home = () => {
  let [totalproduct, setTotalproduct] = useState(0)
  let [totalorder, setTotalorder] = useState(0)
  const { serverurl } = useContext(Authdatacontext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(
        `${serverurl}/api/product/listproduct`,
        { withCredentials: true }
      );
      setTotalproduct(products.data.length);

      const orders = await axios.get(
        `${serverurl}/api/order/allorders`,
        { withCredentials: true }
      );
      setTotalorder(orders.data.length);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [])

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Dashboard</h1>

        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Total Products</span>
            <span className="admin-stat-card__value">{totalproduct}</span>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-card__label">Total Orders</span>
            <span className="admin-stat-card__value">{totalorder}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;