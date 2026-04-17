import Bestseller from "../component/Bestseller"
import Latestcollection from "../component/Latestcollection"

const Product = () => {
return(
    <div className="productSection">
      <Latestcollection/>
      <Bestseller/>
    </div>
)
}

export default Product