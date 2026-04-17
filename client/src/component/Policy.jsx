import Title from "./Title";
import { RiExchangeLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";

const Policy = () => {
  return (
    <div className="policySection">
      <div className="container">
        <div className="productSection__header">
          <Title text1={"OUR"} text2={"POLICY"} />
          <p className="sectionSub">
            Customer-Friendly Policies Committed to Your Satisfaction and Safety.
          </p>
        </div>

        <div className="policyGrid">
          <div className="policyCard">
            <RiExchangeLine className="policyCard__icon" />
            <p className="policyCard__title">Easy Exchange Policy</p>
            <p className="policyCard__desc">
              Easy exchange policy which is simple and customer friendly
            </p>
          </div>

          <div className="policyCard">
            <TbRosetteDiscountCheckFilled className="policyCard__icon" />
            <p className="policyCard__title">Easy Return Policy</p>
            <p className="policyCard__desc">
              Easy 7 day return guaranteed policy
            </p>
          </div>

          <div className="policyCard">
            <MdSupportAgent className="policyCard__icon" />
            <p className="policyCard__title">Best Customer Support</p>
            <p className="policyCard__desc">
              Trusted customer support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy;