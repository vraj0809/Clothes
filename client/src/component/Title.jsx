const Title = ({text1, text2}) => {
  return (
    <div className='sectionTitle'>
      <span>{text1}</span> <span className='sectionTitle__accent'>{text2}</span>
    </div>
  )
}

export default Title