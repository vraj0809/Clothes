import React, { useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../context/contexts";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {

  const { serverurl } = useContext(authDataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetPassword = async () => {
    if (!email) {
      setErrorMessage("Session expired. Please use Forgot password again.");
      setMessage("");
      return;
    }
    if (!otp || !newpassword) {
      setErrorMessage("Please fill OTP and new password");
      setMessage("");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    setMessage("");

    try {

      const result = await axios.post(
        `${serverurl}/api/auth/resetotpverify`,
        { email, otp, newpassword }
      );

      setMessage(result.data.message || "Password reset successfully");

      navigate("/login");

    } catch (error) {

      setErrorMessage(error.response?.data?.message || "Reset failed");

    } finally {
      setIsSubmitting(false);
    }

  };

  return (

    <div className="authPage">
      <div className="authCard">
        <div className="authTitle">
          <div className="authTitle__h">Reset password</div>
          <div className="authTitle__p">Enter your OTP and set a new password.</div>
        </div>

        <div className="form">
          <div className="field">
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input"
              inputMode="numeric"
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="New password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              autoComplete="new-password"
              required
            />
          </div>

          <button className="primaryBtn" onClick={resetPassword}>
            {isSubmitting ? "Resetting..." : "Reset password"}
          </button>
          {message ? (
            <p style={{ color: "#22c55e", marginTop: "10px", textAlign: "center" }}>{message}</p>
          ) : null}
          {errorMessage ? (
            <p style={{ color: "#ef4444", marginTop: "10px", textAlign: "center" }}>{errorMessage}</p>
          ) : null}
        </div>
      </div>
    </div>

  );

}

export default ResetPassword;