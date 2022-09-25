const Button = ({ value, onClick, width, padding, radius, extraClasses, type }) => {
  return (
    <button
      onClick={onClick}
      className={`${padding} ${width} ${radius} ${extraClasses} text-white bg-primary-base hover:bg-primary-hover outline-none rounded-md transition duration-300 shadow-sm`}
      type={type}
    >
      {value}
    </button>
  )
}

export default Button
