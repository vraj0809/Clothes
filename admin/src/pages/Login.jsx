import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.jpg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Authdatacontext } from "../context/Authcontext";
import { admindatacontext } from "../context/Admincontext";

function Login() {
  const navigate = useNavigate();
  const { serverurl } = useContext(Authdatacontext);
  let { admindata, getadmin } = useContext(admindatacontext);
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverurl}/api/auth/adminlogin`,
        values,
        { withCredentials: true }
      );
      console.log(result.data);
      alert("Admin Login successfully");
      getadmin();
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.message || "Login failed");
        console.log("Backend error:", error.response.data);
      } else if (error.request) {
        alert("Server not responding");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__brand" onClick={() => navigate("/")}>
        <img src={Logo} alt="logo" />
        <h1>OneCart</h1>
      </div>

      <div className="admin-login__card">
        <div className="admin-login__title">
          <h2>Admin Login</h2>
          <p>Welcome back</p>
        </div>

        <form className="admin-login__form" onSubmit={handlesubmit}>
          <input
            type="email"
            name="email"
            onChange={handlechange}
            value={values.email}
            required
            placeholder="Enter your email"
            className="admin-login__input"
          />

          <div className="admin-login__field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handlechange}
              value={values.password}
              required
              placeholder="Enter your password"
              className="admin-login__input"
              style={{ paddingRight: 44 }}
            />
            {showPassword ? (
              <IoEye onClick={() => setShowPassword(false)} className="admin-login__eye" />
            ) : (
              <IoEyeOff onClick={() => setShowPassword(true)} className="admin-login__eye" />
            )}
          </div>

          <button type="submit" className="admin-login__btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
