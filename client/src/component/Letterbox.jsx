

const Letterbox = () => {
  const handlesubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="newsletter">
      <p className="newsletter__title">Subscribe now &amp; get 20% off</p>
      <p className="newsletter__sub">
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>

      <form
        action=""
        onSubmit={handlesubmit}
        className="newsletter__form"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter__input"
          required
        />

        <button
          type="submit"
          className="newsletter__btn"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Letterbox;