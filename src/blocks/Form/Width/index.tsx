import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div className={`px-3 w-full shrink-0 ${className || ''}`} style={{ width: width ? `${width}%` : '100%' }}>
      {children}
    </div>
  )
}
