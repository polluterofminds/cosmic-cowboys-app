import React from 'react'

const LeftCard = ({ children, customClasses }) => {
  const classes = `${customClasses} relative z-0 m-auto rounded-l-lg bg-cardBackground border border-primary shadow-md shadow-primary`
  return (
    <div className={classes}>         
      {children}
    </div>
  )
}

export default LeftCard