import axios from "axios";
import logo from "../assets/logo.jpg"
import { useContext } from "react";
import { admindatacontext } from "../context/Admincontext";
import { useNavigate } from "react-router-dom";
import { Authdatacontext } from "../context/Authcontext";

const Nav = () => {
    const {serverurl} = useContext(Authdatacontext)
    const navigate = useNavigate();
    const { getadmin } = useContext(admindatacontext)
    const handlelogout = async (e) => {
        try {
            const result = await axios.get(`${serverurl}/api/auth/logout`, { withCredentials: true })
            console.log(result.data);
            getadmin();
            navigate("/login")
        } catch (error) {
            console.log("error in logout", error);
        }
    }
    return (
        <div className="admin-nav">
            <div
                className="admin-nav__brand"
                onClick={() => navigate("/")}
            >
                <img src={logo} alt="logo" className="admin-nav__logo" />
                <span className="admin-nav__title">Clothes</span>
            </div>
            <button className="admin-nav__logout" onClick={handlelogout}>
                Logout
            </button>
        </div>
    )
}

export default Nav;