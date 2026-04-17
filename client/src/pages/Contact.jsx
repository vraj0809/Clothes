import Title from "../component/Title"
import { MdContactMail } from "react-icons/md"
const Contact = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="sectionHeader">
          <Title text1={'CONTACT'} text2={'US'} />
        </div>

        <section className="section split">
          <div className="infoCard" style={{ display: "grid", placeItems: "center" }}>
            <MdContactMail className="contactIcon" aria-hidden="true" />
          </div>

          <div className="infoCard">
            <div className="infoCard__h">Our store</div>
            <div className="infoCard__p">
              12345 Random Station<br />
              Random City, State, India
            </div>

            <div className="infoCard__h" style={{ marginTop: 16 }}>Contact</div>
            <div className="infoCard__p">
              Email: support@yourstore.com<br />
              Phone: +91 9876543210
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Contact