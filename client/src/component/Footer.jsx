import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <button className="footer__brand" onClick={() => navigate("/")}>
              <img src={logo} alt="Cloths" className="footer__logo" loading="lazy" decoding="async" />
              <span className="footer__title">Cloths</span>
            </button>
            <div className="footer__text">
              Cloths is your all-in-one online shopping destination, offering top-quality products, unbeatable deals,
              and fast delivery — backed by trusted service designed to make your life easier every day.
            </div>
          </div>

          <div>
            <div className="footer__h">Company</div>
            <ul className="footer__list">
              <li><button className="footer__link" onClick={() => navigate("/")}>Home</button></li>
              <li><button className="footer__link" onClick={() => navigate("/about")}>About</button></li>
              <li><button className="footer__link" onClick={() => navigate("/collection")}>Collections</button></li>
              <li><button className="footer__link" onClick={() => navigate("/contact")}>Contact</button></li>
            </ul>
          </div>

          <div>
            <div className="footer__h">Get in touch</div>
            <ul className="footer__list">
              <li>+91-1234567890</li>
              <li>Clothes@gmail.com</li>
              <li>+1-123-456-7890</li>
              <li>adminclothes@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">Copyright 2025 © Cloths.com – All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer;