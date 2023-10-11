import React from 'react'

const GradientHeading = ({ children, customClasses }) => {
  const classes = `${customClasses} bg-gradient-to-r from-primary to-light bg-clip-text text-transparent`
  return (
    <h1 className={classes}>
      {children}
    </h1>
  )
}

export default GradientHeading