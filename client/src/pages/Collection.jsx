import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
/* eslint-disable react-hooks/set-state-in-effect */
import { shopdatacontext, authDataContext } from "../context/contexts";
import Card from "../component/Card";

const Collection = () => {

  const [showfilter, setShowfilter] = useState(false);

  const { search, showsearch } = useContext(shopdatacontext);
  const { serverurl } = useContext(authDataContext);

  const [filterproduct, setFilterproduct] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sorttype, setSorttype] = useState("");

  const fetchFilteredProducts = async () => {
    try {
      const params = {
        category,
        subcategory,
        search: showsearch ? search : "",
        sort: sorttype
      };
      const res = await axios.get(
        `${serverurl}/api/product/filterproduct`,
        { params }
      );
      setFilterproduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, subcategory, search, sorttype, showsearch]);

  const sortedProducts = useMemo(() => filterproduct, [filterproduct]);

  return (
    <div className="collectionPage" >

      <div
        className={`filterOverlay ${showfilter ? 'filterOverlay--visible' : ''}`}
        onClick={() => setShowfilter(false)}
      />

      <div className={`filterSidebar ${showfilter ? 'filterSidebar--open' : ''}`}>

        <p className="filterSidebar__title" onClick={() => setShowfilter(prev => !prev)}>
          FILTERS
          {!showfilter && <FaArrowRight style={{ fontSize: 12 }} className="mobileFilterBtn" />}
          {showfilter && <FaChevronDown style={{ fontSize: 12 }} className="mobileFilterBtn" />}
        </p>

        <div className={`filterGroup ${!showfilter ? 'filterGroup--collapsed' : ''}`}>
          <select
            className="sortSelect"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <p className="filterSidebar__title" style={{ marginTop: 24 }}>
          SUB-CATEGORY
        </p>

        <div className={`filterGroup ${!showfilter ? 'filterGroup--collapsed' : ''}`}>
          <select
            className="sortSelect"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            <option value="">All Sub-Categories</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>
      </div>

      <div className="collectionContent">

        <div className="collectionHeader">
          <h2>ALL COLLECTIONS</h2>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              className="mobileFilterBtn"
              onClick={() => setShowfilter(prev => !prev)}
            >
              Filters
            </button>

            <select
              className="sortSelect"
              onChange={(e) => setSorttype(e.target.value)}
            >
              <option value="">Sort By: Relevant</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating_desc">Rating: High to Low</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        <div className="productGrid">
          {
            sortedProducts.length > 0 ?
              sortedProducts.map((item, index) => (
                <Card
                  key={index}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                />
              ))
              :
              <div className="emptyState">No products found.</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;