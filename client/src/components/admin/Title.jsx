import React from 'react'

const Title = ({ title, subtitle }) => {
  return (
    <div className='mb-8'>

      {/* Title */}
      <div className='flex items-center gap-3'>
        <h1 className='text-3xl md:text-4xl font-extrabold text-red-500 tracking-wide'>
          {title}
        </h1>

        {/* Red Accent */}
        <span className='h-1 w-16 rounded-full bg-red-500'></span>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className='text-white text-sm md:text-base mt-3 font-medium'>
          {subtitle}
        </p>
      )}

    </div>
  )
}

export default Title