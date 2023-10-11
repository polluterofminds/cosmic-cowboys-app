import React from 'react'

const RightCard = ({ children, customClasses }) => {
  const classes = `${customClasses} relative z-0 m-auto rounded-r-lg rounded-t-lg bg-cardBackground border border-primary shadow-md shadow-primary`
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default RightCard