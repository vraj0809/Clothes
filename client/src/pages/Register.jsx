import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import google from "../assets/googleiconlogin.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { authDataContext } from "../context/contexts";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../util/firebase";
import { userDatacontext } from "../context/contexts";


function Register() {
  const navigate = useNavigate();
  const { serverurl } = useContext(authDataContext);
  const { getcurrentuser } = useContext(userDatacontext)
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const regResult = await axios.post(
        `${serverurl}/api/auth/register`,
        values,
        { withCredentials: true }
      );
      console.log("Registration successful:", regResult.data);

      const otpResult = await axios.post(
        `${serverurl}/api/auth/otpgenerate`,
        { email: values.email },
        { withCredentials: true }
      );
      console.log("OTP sent:", otpResult.data);

      setOtpSent(true);
    } catch (error) {
      console.log("Error in register/otp:", error.response?.data || error);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${serverurl}/api/auth/otpverify`,
        { email: values.email, otp },
        { withCredentials: true }
      );
      console.log("Verification successful:", result.data);
      getcurrentuser();
      navigate("/");
    } catch (error) {
      console.log("Error in OTP verification:", error.response?.data || error);
      setError(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const googleregister = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const result = await axios.post(`${serverurl}/api/auth/glogin`, { name, email }, { withCredentials: true })
      console.log("Google Login/Register successful:", result.data);
      getcurrentuser();
      navigate("/");
    } catch (error) {
      console.log("Error in Google Auth:", error);
      setError("Google Registration failed");
    }
  }
  return (
    <div className="authPage">
      <div className="authHeader" onClick={() => navigate("/")} role="button" tabIndex={0}>
        <img className="authHeader__logo" src={Logo} alt="Cloths" loading="eager" />
        <div className="authHeader__brand">Clothes</div>
      </div>

      <div className="authCard">
        <div className="authTitle">
          <div className="authTitle__h">Create account</div>
          <div className="authTitle__p">Join Cloths for faster checkout</div>
        </div>

        <form className="form" onSubmit={otpSent ? handleVerifyOTP : handlesubmit}>
          {!otpSent && (
            <>
              <button type="button" className="oauthBtn" onClick={googleregister}>
                <img src={google} alt="" className="oauthBtn__img" />
                Continue with Google
              </button>

              <div className="divider">OR</div>

              <div className="field">
                <input
                  type="text"
                  name="name"
                  onChange={handlechange}
                  value={values.name}
                  placeholder="Full name"
                  className="input"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <input
                  type="email"
                  name="email"
                  onChange={handlechange}
                  value={values.email}
                  placeholder="Email"
                  className="input"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handlechange}
                  value={values.password}
                  placeholder="Password"
                  className="input input--withIcon"
                  autoComplete="new-password"
                  required
                />

                {showPassword ? (
                  <IoEyeOff onClick={() => setShowPassword(false)} className="field__icon" aria-label="Hide password" />
                ) : (
                  <IoEye onClick={() => setShowPassword(true)} className="field__icon" aria-label="Show password" />
                )}
              </div>
            </>
          )}

          {otpSent && (
            <div className="field">
              <input
                type="text"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                placeholder="Enter 6-digit OTP"
                className="input"
                maxLength="6"
                required
              />
            </div>
          )}

          {error && <div className="errorText" style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{error}</div>}

          <button className="primaryBtn" type="submit" disabled={loading}>
            {loading ? "Processing..." : otpSent ? "Verify OTP" : "Register"}
          </button>

          {!otpSent && (
            <div style={{ textAlign: "center" }} className="mutedText">
              Already have an account?{" "}
              <button type="button" className="linkBtn" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
          {otpSent && (
            <div style={{ textAlign: "center" }} className="mutedText">
              Didn't receive OTP?{" "}
              <button type="button" className="linkBtn" onClick={() => setOtpSent(false)}>
                Go Back
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
