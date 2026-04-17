import h4 from "../assets/h4.jpg"
import h2 from "../assets/h2.jpg"
import h3 from "../assets/h3.jpg"
import h1 from "../assets/h1.avif"

const Background = ({herocount}) => {
  const images = [h2, h3, h1, h4]
  return (
    <>
      {images.map((src, index) => (
        <img 
          key={index}
          src={src} 
          alt="" 
          className={`hero__img ${herocount === index ? "hero__img--active" : ""}`} 
          loading="eager" 
        />
      ))}
    </>
  )
}

export default Background;