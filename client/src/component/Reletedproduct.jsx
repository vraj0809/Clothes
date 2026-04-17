import { useContext, useEffect, useState } from "react";
import { shopdatacontext } from "../context/contexts";
import Card from "./Card";
import Title from "./Title";

const Reletedproduct = ({ category, subcategory, currentproductid }) => {
  let { products } = useContext(shopdatacontext)
  const [releted, setReleted] = useState([])

  useEffect(() => {
    if (!products?.length) {
      setReleted([])
      return
    }
    setReleted(
      products
        .filter((item) => category === item.category)
        .filter((item) => subcategory === item.subcategory)
        .filter((item) => currentproductid !== item._id)
        .slice(0, 4)
    )
  }, [products, category, subcategory, currentproductid])

  return (
    <section className='container' style={{ marginTop: 48, marginBottom: 48 }}>
      <div style={{ marginBottom: 16 }}>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className="productGrid">
        {releted.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </section>
  )
}

export default Reletedproduct;
