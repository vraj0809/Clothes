import { useContext, useState } from "react";
import upload from "../assets/upload.jpg"
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { Authdatacontext } from "../context/Authcontext";
import axios from "axios";
import Loading from "../components/Loading";

const Addp = () => {
    let [image1, setImage1] = useState(null)
    let [image2, setImage2] = useState(null)
    let [image3, setImage3] = useState(null)
    let [image4, setImage4] = useState(null)
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [price, setPrice] = useState("");
    const [subcategory, setSubcategory] = useState("Topwear");
    // const [bestseller, setBestSeller] = useState(false);
    const [numberofproducts, setNumberofproducts] = useState({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
    const [sizes, setSizes] = useState([]);
    const { serverurl } = useContext(Authdatacontext)
    const [loading, setLoading] = useState(false)

    const handlesubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", Number(price));
        formData.append("category", category);
        formData.append("subcategory", subcategory);
        // formData.append("bestseller", JSON.stringify(bestseller));
        const finalStock = {};
        ["S", "M", "L", "XL", "XXL"].forEach(s => {
          finalStock[s] = sizes.includes(s) ? (numberofproducts[s] || 0) : 0;
        });
        formData.append("numberofproducts", JSON.stringify(finalStock));
        formData.append("brand", brand);
        formData.append("sizes", JSON.stringify(sizes));
        if (image1) formData.append("image1", image1);
        if (image2) formData.append("image2", image2);
        if (image3) formData.append("image3", image3);
        if (image4) formData.append("image4", image4);

        let result = await axios.post(
          `${serverurl}/api/product/addproduct`,
          formData,
          { withCredentials: true }
        );
        setLoading(false)
        console.log(result.data)
        alert("Product created successfully");

        setName("");
        setBrand("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        // setBestSeller(false);
        setNumberofproducts({ S: 0, M: 0, L: 0, XL: 0, XXL: 0 });
        setCategory("Men");
        setSubcategory("Topwear");
        setSizes([]);
      } catch (error) {
        console.log(error);
        setLoading(false)
        alert("Product not created");
      }
    };

    return (
      <>
        <Nav />
        <Sidebar />
        <div className="admin-content">
          <h1 className="admin-page-title">Add Product</h1>

          <form className="admin-form" onSubmit={handlesubmit}>

            {/* Images */}
            <div className="admin-form__group">
              <label className="admin-form__label">Upload Images</label>
              <div className="admin-upload-grid">
                {[
                  [image1, setImage1, "image1"],
                  [image2, setImage2, "image2"],
                  [image3, setImage3, "image3"],
                  [image4, setImage4, "image4"],
                ].map(([img, setImg, id], i) => (
                  <label htmlFor={id} key={id} className="admin-upload-item">
                    <img
                      src={!img ? upload : URL.createObjectURL(img)}
                      alt=""
                    />
                    <input
                      type="file"
                      id={id}
                      required={i === 0}
                      hidden
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
                placeholder="Type here"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="admin-form__input"
              />
            </div>

            {/* Brand */}
            <div className="admin-form__group">
              <label className="admin-form__label">Brand</label>
              <input
                type="text"
                placeholder="Type here"
                required
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                className="admin-form__input"
              />
            </div>

            {/* Description */}
            <div className="admin-form__group">
              <label className="admin-form__label">Description</label>
              <textarea
                placeholder="Type here"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="admin-form__textarea"
              />
            </div>

            {/* Category + Sub */}
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                  className="admin-form__select"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label">Sub-Category</label>
                <select
                  onChange={(e) => setSubcategory(e.target.value)}
                  value={subcategory}
                  required
                  className="admin-form__select"
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
                  placeholder="0"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
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
                      value={sizes.includes(size) ? numberofproducts[size] : 0}
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
                      setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])
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
                  onChange={() => setBestSeller(prev => !prev)}
                  checked={bestseller}
                />
                <span className="admin-checkbox__label">Add to Bestseller</span>
              </label>
            </div> */}

            {/* Submit */}
            <button type="submit" className="admin-btn">
              {loading ? <Loading /> : "Add Product"}
            </button>

          </form>
        </div>
      </>
    )
}

export default Addp;