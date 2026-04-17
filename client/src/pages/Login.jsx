
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import google from "../assets/googleiconlogin.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { authDataContext, userDatacontext } from "../context/contexts";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../util/firebase";

function Login() {

  const navigate = useNavigate();
  const { serverurl } = useContext(authDataContext);
  const { getcurrentuser } = useContext(userDatacontext);

  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${serverurl}/api/auth/login`,
        values,
        { withCredentials: true }
      );

      alert("Login successfully");
      await getcurrentuser();
      navigate("/");

    } catch (error) {

      if (error.response) {
        alert(error.response.data?.message || "Login failed");
      } else if (error.request) {
        alert("Server not responding");
      } else {
        alert("Something went wrong");
      }

    }

  };

  const googlelogin = async () => {

    try {

      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const name = user.displayName;
      const email = user.email;

      await axios.post(
        `${serverurl}/api/auth/glogin`,
        { name, email },
        { withCredentials: true }
      );

      alert("Login successfully");
      await getcurrentuser();
      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="authPage">
      <div className="authHeader" onClick={() => navigate("/")} role="button" tabIndex={0}>
        <img className="authHeader__logo" src={Logo} alt="Cloths" loading="eager" />
        <div className="authHeader__brand">Clothes</div>
      </div>

      <div className="authCard">
        <div className="authTitle">
          <div className="authTitle__h">Login</div>
          <div className="authTitle__p">Welcome back</div>
        </div>

        <form className="form" onSubmit={handlesubmit}>
          <button type="button" className="oauthBtn" onClick={googlelogin}>
            <img src={google} alt="" className="oauthBtn__img" />
            Continue with Google
          </button>

          <div className="divider">OR</div>

          <div className="field">
            <input
              type="email"
              name="email"
              onChange={handlechange}
              value={values.email}
              required
              placeholder="Email"
              className="input"
              autoComplete="email"
            />
          </div>

          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handlechange}
              value={values.password}
              required
              placeholder="Password"
              className="input input--withIcon"
              autoComplete="current-password"
            />
            {showPassword ? (
              <IoEyeOff onClick={() => setShowPassword(false)} className="field__icon" aria-label="Hide password" />
            ) : (
              <IoEye onClick={() => setShowPassword(true)} className="field__icon" aria-label="Show password" />
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="linkBtn" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="primaryBtn">
            Login
          </button>

          <div style={{ textAlign: "center" }} className="mutedText">
            Don&apos;t have an account?{" "}
            <button type="button" className="linkBtn" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>

  );

}

export default Login;

