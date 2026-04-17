import { useContext, useEffect, useState } from "react";
import { Authdatacontext } from "../context/Authcontext";
import axios from "axios";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");

  let { serverurl } = useContext(Authdatacontext)

  const listproduct = async () => {
    try {
      let result = await axios.get(`${serverurl}/api/product/listproduct`)
      setList(result.data)
      console.log(result.data, "listproduct")
    } catch (error) {
      console.log("error in list product ")
    }
  }

  const removeitem = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) return;
      let result = await axios.delete(`${serverurl}/api/product/removeproduct/${id}`, { withCredentials: true })
      if (result.data) {
        listproduct();
      } else {
        console.log("failed to remove item")
      }
    } catch (error) {
      console.log("error in remove", error)
    }
  }

  useEffect(() => {
    listproduct();
  }, [])

  const filteredList = list.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    const sub = item.subcategory || item.subCategory;
    const matchesSubCategory = subCategoryFilter === "" || sub === subCategoryFilter;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">All Products</h1>

        {/* Filters */}
        <div className="admin-filter-bar" style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or brand..."
            className="admin-form__input admin-filter-input"
            style={{ flex: 2, minWidth: "200px" }}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <select
            className="admin-form__select admin-filter-select"
            style={{ flex: 1, minWidth: "150px" }}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          <select
            className="admin-form__select admin-filter-select"
            style={{ flex: 1, minWidth: "150px" }}
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
          >
            <option value="">All Sub-Categories</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {filteredList && filteredList.length > 0 ? (
          <div className="admin-list">
            {filteredList.map((item, index) => (
              <div key={index} className="admin-list-item">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="admin-list-item__img"
                />
                <div className="admin-list-item__info">
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span className="admin-list-item__name" style={{ fontWeight: "700", color: "#000" }}>{item.brand}</span>
                      <span className="admin-list-item__name" style={{ color: "#555" }}>— {item.name}</span>
                      {item.numberofproducts <= 0 ? (
                        <span style={{
                          backgroundColor: "#ffebee",
                          color: "#c62828",
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: "1px solid #ffcdd2",
                          textTransform: "uppercase",
                          marginLeft: "5px"
                        }}>Sold Out</span>
                      ) : item.numberofproducts <= 5 ? (
                         <span style={{
                          backgroundColor: "#fff3e0",
                          color: "#e65100",
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          border: "1px solid #ffe0b2",
                          textTransform: "uppercase",
                          marginLeft: "5px"
                        }}>{item.numberofproducts } Left</span>
                      ) : null}
                    </div>
                  </div>
                  <span className="admin-list-item__meta">{item.category} | {item.subcategory || item.subCategory || "N/A"}</span>
                  <span className="admin-list-item__price">₹ {item.price}</span>
                </div>
                <div className="admin-list-item__actions">
                  <button
                    className="admin-btn admin-btn--outline admin-btn--sm"
                    onClick={() => navigate(`/updateproduct/${item._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => removeitem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-order-empty">
            <p>No products found matching the filters.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default List;