import React from 'react'

const Container = ({ children, className }) => {
  return <div className={`mt-20 min-h-90vh relative z-40 mx-3 sm:mx-8 lg:mx-12 ${className}`}>{children}</div>
}

export default Container
