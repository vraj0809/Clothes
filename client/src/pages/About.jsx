import Title from "../component/Title"
import img from "../assets/img2.jpg"
const About = () => {
return(
    <div className="page">
      <div className="container">
        <div className="sectionHeader">
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <section className="section split">
          <div className="mediaCard">
            <img src={img} alt="About Cloths" className="mediaCard__img" loading="lazy" decoding="async" />
          </div>

          <div className="infoCard">
            <div className="infoCard__h">Built for smart, seamless shopping</div>
            <div className="infoCard__p">
              Cloths is built for smart and seamless shopping — created to deliver quality products, trending styles,
              and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes
              your online shopping experience simple, satisfying, and stress-free.
            </div>
            <div className="infoCard__p" style={{ marginTop: 10 }}>
              Our mission is to provide customers with the best products at affordable prices while ensuring a smooth
              and secure shopping journey.
            </div>
            <div className="infoCard__p" style={{ marginTop: 10 }}>
              We continuously improve our platform to bring innovation, convenience, and trust to every order you
              place.
            </div>
          </div>
        </section>

        <section className="section">
          <div className="sectionHeader">
            <Title text1={'WHY'} text2={'CHOOSE US'} />
          </div>

          <div className="cardGrid">
            <div className="infoCard">
              <div className="infoCard__h">Quality products</div>
              <div className="infoCard__p">
                We provide high-quality, trusted, and trending products to ensure customer satisfaction with every
                purchase.
              </div>
            </div>

            <div className="infoCard">
              <div className="infoCard__h">Fast delivery</div>
              <div className="infoCard__p">Our efficient logistics ensure your orders are delivered quickly and safely.</div>
            </div>

            <div className="infoCard">
              <div className="infoCard__h">Secure payments</div>
              <div className="infoCard__p">
                We use secure and reliable payment gateways to protect your personal and financial information.
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
)
}

export default About