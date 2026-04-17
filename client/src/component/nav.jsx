import { useContext, useEffect, useState } from "react"
import logo from "../assets/logo.png"
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";
import { userDatacontext } from "../context/contexts";
import { RiSearch2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios";
import { authDataContext } from "../context/contexts";
import { IoHome } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import { MdContactPhone } from "react-icons/md";
import { shopdatacontext } from "../context/contexts";
const Nav = () => {
  const {serverurl} = useContext(authDataContext);
  const { showsearch, setShowsearch, search, setSearch, getcartcount, cartitem } = useContext(shopdatacontext)
  const [profile, setProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { getcurrentuser,user } = useContext(userDatacontext)
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
    setCartCount(getcartcount())
  }, [cartitem])

  const go = (path) => {
    setProfile(false)
    navigate(path)
  }

  const handlelogout = async() => {
try {
  const result = await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
  console.log(result.data);
  getcurrentuser()
} catch (error) {
  console.log("error in logout",error);
}
  }
  return (
    <header className="nav">
      <div className="container nav__inner">
        <button className="nav__brand" onClick={() => go("/")} aria-label="Go to home">
          <img src={logo} alt="OneCart" className="nav__logo" loading="eager" />
          <span className="nav__title">Clothes</span>
        </button>

        <nav className="nav__links" aria-label="Primary">
          <button
            className={`nav__link ${location.pathname === "/" ? "nav__link--active" : ""}`}
            onClick={() => go("/")}
          >
            Home
          </button>
          <button
            className={`nav__link ${location.pathname.startsWith("/collection") ? "nav__link--active" : ""}`}
            onClick={() => go("/collection")}
          >
            Collections
          </button>
          <button
            className={`nav__link ${location.pathname.startsWith("/about") ? "nav__link--active" : ""}`}
            onClick={() => go("/about")}
          >
            About
          </button>
          <button
            className={`nav__link ${location.pathname.startsWith("/contact") ? "nav__link--active" : ""}`}
            onClick={() => go("/contact")}
          >
            Contact
          </button>
        </nav>

        <div className="nav__actions">
          {showsearch === false && (
            <button
              className="iconBtn"
              onClick={() => {
                setShowsearch((prev) => !prev);
                navigate("/collection");
              }}
              aria-label="Open search"
            >
              <IoSearchCircle size={22} />
            </button>
          )}
          {showsearch === true && (
            <button
              className="iconBtn"
              onClick={() => setShowsearch((prev) => !prev)}
              aria-label="Close search"
            >
              <RiSearch2Fill size={20} />
            </button>
          )}

          <button
            className="avatar"
            onClick={() => setProfile((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={profile}
            aria-label="Account menu"
          >
            {!user ? <FaUserCircle size={22} /> : user.name?.slice(0, 1)}
          </button>

          <div style={{ position: "relative" }}>
            <button className="iconBtn" onClick={() => go("/cart")} aria-label="Open cart">
              <FaOpencart size={18} />
            </button>
            <span className="badge" style={{ top: -6, right: -6 }}>
              {cartCount}
            </span>
          </div>
        </div>

        {showsearch && (
          <div className="searchBar" role="region" aria-label="Search products">
            <div className="container searchBar__inner">
              <input
                type="text"
                className="searchBar__input"
                placeholder="Search products…"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        )}

        {profile && (
          <div className="menu" role="menu" aria-label="Account">
            <ul className="menu__list">
              {!user && (
                <li>
                  <button className="menu__item" role="menuitem" onClick={() => go("/login")}>
                    Login
                  </button>
                </li>
              )}
              {user && (
                <li>
                  <button
                    className="menu__item"
                    role="menuitem"
                    onClick={() => {
                      handlelogout();
                      go("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
              <li>
                <button className="menu__item" role="menuitem" onClick={() => go("/order")}>
                  Orders
                </button>
              </li>
              <li>
                <button className="menu__item" role="menuitem" onClick={() => go("/about")}>
                  About
                </button>
              </li>
              <li>
                <button className="menu__item" role="menuitem" onClick={() => go("/contact")}>
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="bottomNav" role="navigation" aria-label="Bottom navigation">
        <div className="container bottomNav__inner">
          <button className="bottomNav__btn" onClick={() => go("/")} aria-label="Home">
            <IoHome size={22} />
            Home
          </button>
          <button className="bottomNav__btn" onClick={() => go("/collection")} aria-label="Collections">
            <BsCollection size={22} />
            Collection
          </button>
          <button className="bottomNav__btn" onClick={() => { setShowsearch((prev) => !prev); go("/collection"); }} aria-label="Search">
            <IoSearchCircle size={22} />
            Search
          </button>
          <button className="bottomNav__btn" onClick={() => setProfile((prev) => !prev)} aria-label="Profile">
            {!user ? (
              <FaUserCircle size={22} />
            ) : (
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border-2, #ddd)",
                  background: "var(--bg, #f5f5f5)",
                  color: "var(--text, #111)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "uppercase"
                }}
              >
                {user.name?.slice(0, 1)}
              </div>
            )}
            Profile
          </button>
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <button className="bottomNav__btn" onClick={() => go("/cart")} aria-label="Cart">
              <FaOpencart size={22} />
              Cart
            </button>
            <span className="badge" style={{ top: 10, right: 10 }}>
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav