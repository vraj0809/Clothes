import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { shopdatacontext } from "../context/contexts"
import Card from "./Card"

const Bestseller = () => {
  let { products } = useContext(shopdatacontext)
  const [bestseller, setBestseller] = useState([])

  useEffect(() => {
    setBestseller(products.filter((item) => {
      if (!item.ratings || item.ratings.length === 0) return false;
      const sum = item.ratings.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = sum / item.ratings.length;
      return avgRating >= 4;
    }).slice(0, 4))
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
