import React from 'react'

const Card = ({ children, customClasses }) => {
  const classes = `${customClasses} relative z-0 m-auto rounded-lg bg-mainBrown border border-primary shadow-md shadow-primary`
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default Card