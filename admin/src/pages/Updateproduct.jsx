import { useContext, useEffect, useState } from "react";
import upload from "../assets/upload.jpg";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Authdatacontext } from "../context/Authcontext";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const Updatep = () => {
  const { id } = useParams();
  const { serverurl } = useContext(Authdatacontext);

  let [image1, setImage1] = useState("")
  let [image2, setImage2] = useState("")
  let [image3, setImage3] = useState("")
  let [image4, setImage4] = useState("")

  const [oldImages, setOldImages] = useState([])
  const [name, setName] = useState("")
  const [brand, setBrand] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subcategory, setSubcategory] = useState("Topwear")
  // const [bestseller, setBestSeller] = useState(false)
  const [numberofproducts, setNumberofproducts] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 })
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        let res = await axios.get(`${serverurl}/api/product/singleproduct/${id}`)
        let p = res.data
        setName(p.name)
        setBrand(p.brand)
        setDescription(p.description)
        setCategory(p.category)
        setSubcategory(p.subcategory)
        setPrice(p.price)
        setSizes(p.sizes || [])
        // setBestSeller(p.bestseller)
        setNumberofproducts(p.numberofproducts || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 })
        setOldImages([p.image1, p.image2, p.image3, p.image4])
      } catch (error) {
        console.log(error)
      }
    }
    fetchproduct()
  }, [id])

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", Number(price))
      formData.append("category", category)
      formData.append("subcategory", subcategory)
      // formData.append("bestseller", JSON.stringify(bestseller))
      const finalStock = {};
      ["S", "M", "L", "XL", "XXL"].forEach(s => {
        finalStock[s] = sizes.includes(s) ? (numberofproducts[s] || 0) : 0;
      });
      formData.append("numberofproducts", JSON.stringify(finalStock));
      formData.append("brand", brand)
      formData.append("sizes", JSON.stringify(sizes))
      if (image1) formData.append("image1", image1)
      if (image2) formData.append("image2", image2)
      if (image3) formData.append("image3", image3)
      if (image4) formData.append("image4", image4)

      await axios.put(
        `${serverurl}/api/product/updateproduct/${id}`,
        formData,
        { withCredentials: true }
      )
      setLoading(false)
      alert("Product Updated Successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      alert("Product Not Updated")
    }
  }

  return (
    <>
      <Nav />
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-page-title">Update Product</h1>

        <form className="admin-form" onSubmit={handlesubmit}>

          {/* Images */}
          <div className="admin-form__group">
            <label className="admin-form__label">Images</label>
            <div className="admin-upload-grid">
              {[
                [image1, setImage1, "image1", oldImages?.[0]],
                [image2, setImage2, "image2", oldImages?.[1]],
                [image3, setImage3, "image3", oldImages?.[2]],
                [image4, setImage4, "image4", oldImages?.[3]],
              ].map(([img, setImg, id, old]) => (
                <label htmlFor={id} key={id} className="admin-upload-item">
                  <img
                    src={(img && typeof img === 'object') ? URL.createObjectURL(img) : old || upload}
                    alt=""
                  />
                  <input
                    hidden
                    type="file"
                    id={id}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="admin-form__group">
            <label className="admin-form__label">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="admin-form__input"
            />
          </div>

          {/* Brand */}
          <div className="admin-form__group">
            <label className="admin-form__label">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="admin-form__input"
            />
          </div>

          {/* Description */}
          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-form__textarea"
            />
          </div>

          {/* Category + Sub */}
          <div className="admin-form__row">
            <div className="admin-form__group">
              <label className="admin-form__label">Category</label>
                <select
                  className="admin-form__select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Sub-Category</label>
                <select
                  className="admin-form__select"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  {/* <option value="Winterwear">Winterwear</option> */}
                </select>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="admin-form__row">
            <div className="admin-form__group">
              <label className="admin-form__label">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="admin-form__input"
              />
            </div>
          </div>

          <div className="admin-form__group">
            <label className="admin-form__label">Stock Quantity per Size</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div key={size} style={{ opacity: sizes.includes(size) ? 1 : 0.4 }}>
                  <label style={{ fontSize: "12px", display: "block", marginBottom: "4px" }}>{size}</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    disabled={!sizes.includes(size)}
                    onChange={(e) => setNumberofproducts(prev => ({ ...prev, [size]: Number(e.target.value) }))}
                    value={sizes.includes(size) ? (numberofproducts?.[size] || 0) : 0}
                    className="admin-form__input"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="admin-form__group">
            <label className="admin-form__label">Sizes</label>
            <div className="admin-size-grid">
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <button
                  type="button"
                  key={size}
                  className={`admin-size-btn ${sizes.includes(size) ? 'admin-size-btn--active' : ''}`}
                  onClick={() => {
                    setSizes(prev =>
                      prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
                    )
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          {/* <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={() => setBestSeller(prev => !prev)}
              />
              <span className="admin-checkbox__label">Add To Bestseller</span>
            </label>
          </div> */}

          <button type="submit" className="admin-btn">
            {loading ? <Loading /> : "Update Product"}
          </button>
        </form>
      </div>
    </>
  )
}

export default Updatep