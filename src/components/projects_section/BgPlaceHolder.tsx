import React from 'react'

const BgPlaceHolder = () => {
  return (
    <div className="relative group">
      <img className="h-52 w-full object-cover" src="/portfolio/bg.jpg" alt="Loading..." />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[4px] transition-all duration-300 group-hover:backdrop-blur-0 group-hover:bg-black/10"></div>
    </div>
  )
}

export default BgPlaceHolder