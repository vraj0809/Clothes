import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { shopdatacontext } from "../context/contexts"
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import Reletedproduct from "../component/Reletedproduct";
import { toast } from "react-toastify";
const Productdetail = () => {

  let { id } = useParams()
  let { products, currency, addtocart } = useContext(shopdatacontext)

  let [productdata, setProductdata] = useState()
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [thumbs, setThumbs] = useState([])
  const [avgRating, setAvgRating] = useState(0)

  const fetchproductdata = async () => {

    products.map((item) => {
      if (item._id === id) {
        setProductdata(item)
        setImage(item.image1)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
      }
      return null
    })

  }

  useEffect(() => {
    fetchproductdata()
  }, [products, id])

  useEffect(() => {
    setThumbs([image1, image2, image3, image4].filter(Boolean))
  }, [image1, image2, image3, image4])

  useEffect(() => {
    if (!productdata) {
      setAvgRating(0)
      return
    }

    const ratingCount = productdata?.ratings?.length || 0
    if (ratingCount > 0) {
      const dbAvg = Number(productdata.avgrating)
      if (!Number.isNaN(dbAvg) && dbAvg > 0) {
        setAvgRating(dbAvg)
        return
      }

      const sum = productdata.ratings.reduce((acc, curr) => acc + Number(curr.rating || 0), 0)
      setAvgRating(sum / ratingCount)
      return
    }

    setAvgRating(0)
  }, [productdata])

  const getRatingColor = (rate) => {
    if (rate >= 4) return "#388e3c";
    if (rate >= 3) return "#fbc02d";
    if (rate >= 1) return "#f57c00";
    return "#d32f2f";
  };

  const handleAdd = async () => {
    if (!size) {
      toast.info("Please select a size")
      return
    }
    await addtocart(productdata._id, size)
  }

  if (!productdata) {
    return (
      <div className="page">
        <div className="container">
          <div className="productDetail">
            <div className="productDetail__thumbs">
              <div className="thumbs">
                <div className="thumb skeleton" />
                <div className="thumb skeleton" />
                <div className="thumb skeleton" />
              </div>
            </div>
            <div className="productDetail__media">
              <div className="media skeleton" />
            </div>
            <div className="productDetail__info">
              <div className="pInfo">
                <div className="skeleton" style={{ height: 34, width: "70%" }} />
                <div className="skeleton" style={{ height: 18, width: 120 }} />
                <div className="skeleton" style={{ height: 26, width: 160 }} />
                <div className="skeleton" style={{ height: 70, width: "92%" }} />
                <div className="skeleton" style={{ height: 44, width: 220 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page productPage">
      <div className="container">
        <div className="productDetail">
          <div className="productDetail__thumbs">
            <div className="thumbs" aria-label="Product thumbnails">
              {thumbs.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  className={`thumb ${img === image ? "thumb--active" : ""}`}
                  onClick={() => setImage(img)}
                  aria-label={`Select image ${i + 1}`}
                >
                  <img src={img} alt="" className="thumb__img" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="productDetail__media">
            <div className="media" aria-label="Selected product image">
              <img src={image} alt={productdata.name} className="media__img" decoding="async" />
              {(productdata?.bestseller === true || avgRating >= 4) && <div className="bestsellerBadge">Bestseller</div>}
            </div>
          </div>

          <div className="productDetail__info">
            <div className="pInfo">
              {productdata.brand && (
                <div style={{ fontSize: "14px", color: "#555", marginBottom: "10px", fontWeight: "600" }}>
                  Brand: <span style={{ textTransform: "capitalize", color: "#000", fontWeight: "700" }}>{productdata.brand}</span>
                </div>
              )}
              <div className="pInfo__title">{productdata.name}</div>

              {(() => {
                const stock = size ? (productdata.numberofproducts?.[size.toUpperCase()] || 0) : null;

                if (size) {
                  if (stock <= 0) return <div style={{ color: "red", fontWeight: "800", fontSize: "18px", marginBottom: "15px", textTransform: "uppercase" }}>SIZE {size} SOLD OUT</div>;
                  if (stock <= 5) return <div style={{ color: "#e65100", fontWeight: "700", fontSize: "16px", marginBottom: "15px", textTransform: "uppercase" }}>ONLY {stock} LEFT IN SIZE {size}</div>;
                }
                
                return null;
              })()}

              <div className="pInfo__rating" aria-label={`Rating ${avgRating.toFixed(1)} out of 5`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {productdata?.ratings?.length > 0 && (
  <div
    style={{
      backgroundColor: getRatingColor(avgRating),
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '14px',
      fontWeight: 'bold'
    }}
  >
    <span>{avgRating.toFixed(1)}</span>
    <FaStar size={12} color="#fff" />
  </div>
)}
                <span style={{ fontSize: "14px", color: "#444" }}>
                  {productdata?.ratings?.length || 0} Review{(productdata?.ratings?.length || 0) !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="pInfo__price">
                {currency} {productdata.price}
              </div>

              <div className="pInfo__desc">
                {productdata.description ||
                  "Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style."}
              </div>

              <div className="sizePicker">
                <div className="sizePicker__label">Select size</div>
                <div className="sizePicker__row" role="listbox" aria-label="Sizes">
                  {productdata.sizes?.map((item, index) => {
                    const sizeStock = productdata.numberofproducts?.[item.toUpperCase()] || 0;
                    return (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSize(item)}
                        className={`sizeBtn ${item === size ? "sizeBtn--selected" : ""} ${sizeStock <= 0 ? "sizeBtn--out-of-stock" : ""}`}
                        aria-selected={item === size}
                        role="option"
                        disabled={sizeStock <= 0}
                        style={sizeStock <= 0 ? { opacity: 0.5, cursor: "not-allowed", textDecoration: "line-through" } : {}}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                className="addBtn"
                onClick={handleAdd}
                disabled={!size || (productdata.numberofproducts?.[size.toUpperCase()] || 0) <= 0}
              >
                Add to cart
              </button>

              <div style={{ color: "rgba(0, 0, 0, 0.72)", display: "grid", gap: 6 }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#000" }}>100% original product.</div>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#000" }}>Cash on delivery is available on this product.</div>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "#000" }}>Easy return and exchange policy within 7 days.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="infoPanel">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('description')}
              style={{ opacity: activeTab === 'description' ? 1 : 0.6, borderBottom: activeTab === 'description' ? "2px solid #fff" : "none" }}
            >
              Description
            </button>
            <button
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab('reviews')}
              style={{ opacity: activeTab === 'reviews' ? 1 : 0.6, borderBottom: activeTab === 'reviews' ? "2px solid #fff" : "none" }}
            >
              Reviews ({productdata.ratings?.length || 0})
            </button>
          </div>

          <div className="panel" style={{ minHeight: "150px" }}>
            {activeTab === 'description' && (
              <p>
                {productdata.description || "Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function."}
              </p>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {(!productdata.ratings || productdata.ratings.length === 0) ? (
                  <p style={{ color: "rgba(255,255,255,0.6)", padding: "20px 0" }}>No reviews yet. Be the first to rate this product!</p>
                ) : (
                  productdata.ratings.map((review, i) => (
                    <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            s <= review.rating
                              ? <FaStar key={s} size={14} color="#FFD700" />
                              : <FaRegStar key={s} size={14} color="rgba(255,255,255,0.3)" />
                          ))}
                        </div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p style={{ fontSize: "15px", lineHeight: "1.5", margin: 0 }}>
                        {review.comment || <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.5)" }}>No comment provided</span>}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <Reletedproduct category={productdata.category} subcategory={productdata.subcategory} currentproductid={productdata._id} />
      </div>
    </div>
  )
}

export default Productdetail