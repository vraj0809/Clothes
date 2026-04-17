import React, { useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../context/contexts";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

  const { serverurl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setErrorMessage("Please enter your email");
      setMessage("");
      return;
    }
    setIsSending(true);
    setErrorMessage("");
    setMessage("");

    try {

      const result = await axios.post(
        `${serverurl}/api/auth/resetotpgenerate`,
        { email }
      );

      setMessage(result.data.message || "OTP sent successfully");

      navigate("/reset-password", { state: { email } });

    } catch (error) {

      setErrorMessage(error.response?.data?.message || "OTP send failed");

    } finally {
      setIsSending(false);
    }

  };

  return (

    <div className="authPage">
      <div className="authCard">
        <div className="authTitle">
          <div className="authTitle__h">Forgot password</div>
          <div className="authTitle__p">We’ll send an OTP to your email.</div>
        </div>

        <div className="form">
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
              required
            />
          </div>

          <button className="primaryBtn" onClick={sendOtp}>
            {isSending ? "Sending..." : "Send OTP"}
          </button>
          {message ? (
            <p style={{ color: "#22c55e", marginTop: "10px", textAlign: "center" }}>{message}</p>
          ) : null}
          {errorMessage ? (
            <p style={{ color: "#ef4444", marginTop: "10px", textAlign: "center" }}>{errorMessage}</p>
          ) : null}

          <div style={{ textAlign: "center" }}>
            <button className="linkBtn" type="button" onClick={() => navigate("/login")}>
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>

  );

}

export default ForgotPassword;