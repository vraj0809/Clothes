import { useContext, useEffect, useState } from "react"
import Title from "./Title"
import { shopdatacontext } from "../context/contexts"
import Card from "./Card"

const Latestcollection = () => {
  let { products } = useContext(shopdatacontext)
  const [latestproducts, setLatestproducts] = useState([])

  useEffect(() => {
    setLatestproducts(products?.length ? [...products].reverse().slice(0, 8) : [])
  }, [products])

  return (
    <section className="container">
      <div className="productSection__header">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="sectionSub">
          Step Into Style — New Collection Dropping This Season!
        </p>
      </div>
      <div className="productGrid" style={{ marginTop: 18 }}>
        {latestproducts.map((item, index) => (
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

export default Latestcollection
