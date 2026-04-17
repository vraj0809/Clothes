import React, { useState } from "react";
import Background from "../component/Background";
import Hero from "../component/hero";
import Product from "./Product";
import Policy from "../component/Policy";
import Footer from "../component/Footer";


const Home = () => {
  const herodata = [
    {text1: "30% OFF Limited Offer", text2: "Style that"},

{text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!"}, {text1: "Explore Our Best Collection ", text2: "Shop Now!"},

{text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!"}
  ]
  let [herocount,setHerocount] = useState(0);

  return (
    <div className="homeShell">
      <div className="container">
        <div className="hero">
          <Hero 
            herocount={herocount}
            setHerocount={setHerocount}
            herodata={herodata[herocount]}
          />
          <div className="hero__media" aria-hidden="true">
            <Background herocount={herocount}/>
          </div>
        </div>
      </div>
      <Product></Product>
      <Policy></Policy>
      
      <Footer></Footer>
    </div>
  );
};

export default Home;
