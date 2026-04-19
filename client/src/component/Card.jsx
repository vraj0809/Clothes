import { useContext, useEffect, useState } from "react";
import { shopdatacontext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa6";

const Card = ({ name, image, id, price }) => {
  let { currency, products, addtocart } = useContext(shopdatacontext);
  let navigate = useNavigate()

  const [product, setProduct] = useState()
  const [avgRating, setAvgRating] = useState(0)
  const [totalStock, setTotalStock] = useState(0)

  useEffect(() => {
    setProduct(products?.find((p) => p._id === id))
  }, [products, id])

  useEffect(() => {
    if (!product) {
      setAvgRating(0)
      return
    }

    const ratingCount = product?.ratings?.length || 0
    if (ratingCount > 0) {
      const dbAvg = Number(product.avgrating)
      if (!Number.isNaN(dbAvg) && dbAvg > 0) {
        setAvgRating(dbAvg)
        return
      }

      const sum = product.ratings.reduce((acc, curr) => acc + Number(curr.rating || 0), 0)
      setAvgRating(sum / ratingCount)
      return
    }

    setAvgRating(0)
  }, [product])

  useEffect(() => {
    if (!product?.numberofproducts) {
      setTotalStock(0)
      return
    }
    if (typeof product.numberofproducts === 'number') {
      setTotalStock(product.numberofproducts)
      return
    }
    setTotalStock(Object.values(product.numberofproducts).reduce((acc, curr) => acc + (Number(curr) || 0), 0))
  }, [product?.numberofproducts])

  const sizes = product?.sizes || []

  const getRatingColor = (rate) => {
    if (rate >= 4) return "#388e3c";
    if (rate >= 3) return "#fbc02d";
    if (rate >= 1) return "#f57c00";
    return "#d32f2f";
  };

  const handleQuickAdd = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (sizes.length === 1) {
      await addtocart(id, sizes[0])
      toast.success("Added to cart")
      return
    }

    toast.info("Select a size to add to cart")
    navigate(`/productdetail/${id}`)
  }

  return (
    <div className="productCard" onClick={() => navigate(`/productdetail/${id}`)} role="link" tabIndex={0}>
      <div className="productCard__media">
        <img src={image} alt={name} className="productCard__img" loading="lazy" decoding="async" />
        {(product?.bestseller === true || avgRating >= 4) && <div className="bestsellerBadge">Bestseller</div>}
      </div>

      <div className="productCard__body">
        {product?.brand && (
          <div style={{ fontSize: "12px", color: "#555", marginBottom: "6px", fontWeight: "600" }}>
            Brand: <span style={{ textTransform: "capitalize", color: "#000" }}>{product.brand}</span>
          </div>
        )}
        <div className="productCard__name">{name}</div>

        <div className="productCard__priceRow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="productCard__price">
            {currency} {price}
          </div>
          {product?.ratings?.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ backgroundColor: getRatingColor(avgRating), color: "#fff", padding: "2px 6px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "bold" }}>
                <span>{avgRating.toFixed(1)}</span>
                <FaStar size={10} />
              </div>
              <span style={{ fontSize: "12px", color: "#444" }}>({product?.ratings?.length || 0})</span>
            </div>
          )}
        </div>

        {totalStock <= 0 ? (
          <div style={{ color: "red", fontWeight: "700", fontSize: "14px", marginTop: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Sold Out
          </div>
        ) : (
          <>
            <div className="productCard__actions">
              <button className="productCard__cta" onClick={handleQuickAdd}>
                Add to cart
              </button>
            </div>
            {sizes.length > 1 && <div className="productCard__hint" style={{ marginTop: "4px" }}>Multiple sizes • select on product page</div>}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
