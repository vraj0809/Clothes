import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { shopdatacontext } from "../context/contexts"
import Card from "./Card"

const Bestseller = () => {
  let { products } = useContext(shopdatacontext)
  const [bestseller, setBestseller] = useState([])

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setBestseller(products.filter((item) => item.bestseller === true || item.avgrating >= 4).slice(0, 4))
    } else {
      setBestseller([])
    }
  }, [products])

  return (
    <section className="container">
      <div className="productSection__header">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="sectionSub">
          Tried, Tested, Loved — Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="productGrid" style={{ marginTop: 18 }}>
        {bestseller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </section>
  )
}

export default Bestseller
