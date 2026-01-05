import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'
import { Button } from '@payloadcms/ui'
import Link from 'next/link'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <Link href="/">
        <Button className={`${baseClass}__button`}>Home Page</Button>
      </Link>
    </div>
  )
}

export default BeforeDashboard
