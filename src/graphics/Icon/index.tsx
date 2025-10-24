import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  theme?: string | null
}

export const Icon = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="GSC Logo"
      width={150}
      height={150}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('w-[150px] h-[150px]', 'object-contain')}
      src={'/favicon.png'}
    />
  )
}

export default Icon
