import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListAlt, FaHome, FaBox } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
      { icon: <FaHome className="admin-sidebar__icon" />, label: "Home", path: "/" },
      { icon: <IoIosAddCircleOutline className="admin-sidebar__icon" />, label: "Add Product", path: "/addp" },
      { icon: <FaListAlt className="admin-sidebar__icon" />, label: "Product List", path: "/list" },
      { icon: <FaBox className="admin-sidebar__icon" />, label: "Orders", path: "/order" },
    ];

    return (
      <div className="admin-sidebar">
        <div className="admin-sidebar__list">
          {items.map((item) => (
            <button
              key={item.path}
              className={`admin-sidebar__item ${location.pathname === item.path ? 'admin-sidebar__item--active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="admin-sidebar__label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
}

export default Sidebar;