import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={`px-3 shrink-0 w-full sm:w-[var(--field-width)] ${className || ''}`}
      style={{ '--field-width': width ? `${width}%` : '100%' } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
