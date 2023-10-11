import React from 'react'

const TabCard = ({ children, customClasses }) => {
  const classes = `${customClasses} relative z-0 m-auto rounded-t-xl bg-cardBackground border border-primary shadow-md shadow-primary`
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export default TabCard