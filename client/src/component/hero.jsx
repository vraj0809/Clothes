const Hero = ({herodata,herocount,setHerocount}) => {
    return (
      <div className="hero__content">
        <div className="hero__kicker">{herodata.text1}</div>
        <div className="hero__headline">{herodata.text2}</div>
        <div className="hero__sub">Minimal essentials, premium quality, and fast delivery. Shop the latest drops and best sellers.</div>

        <div className="hero__dots" aria-label="Hero slides">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              type="button"
              className={`dot ${herocount === i ? "dot--active" : ""}`}
              onClick={() => setHerocount(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
}

export default Hero;