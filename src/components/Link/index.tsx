import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Service } from '@/payload-types'
import { lucideIcons } from '../../utilities/lucideIcons'
import type { LucideIconName } from '../../utilities/lucideIcons'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services'
    value: Page | Post | Service | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  icon?: LucideIconName | null | ''
  iconPlacement?: 'left' | 'right' | null | ''
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    icon,
    iconPlacement = 'right',
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          (reference.value as Page | Post | Service).slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const IconComponent = icon && icon in lucideIcons ? lucideIcons[icon] : null

  const renderIcon = IconComponent ? (
    <IconComponent
      className={cn('h-4 w-4', {
        'h-5 w-5': size === 'lg',
        'h-3 w-3': size === 'sm',
      })}
    />
  ) : null

  const textContent = children || label

  const content = (
    <>
      {renderIcon && iconPlacement === 'left' && <span className="mr-2">{renderIcon}</span>}
      {textContent}
      {renderIcon && iconPlacement === 'right' && <span className="ml-2">{renderIcon}</span>}
    </>
  )

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className, 'flex items-center')}
        href={href || url || ''}
        {...newTabProps}
      >
        {content}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link
        className={cn(className, 'flex items-center')}
        href={href || url || ''}
        {...newTabProps}
      >
        {content}
      </Link>
    </Button>
  )
}
