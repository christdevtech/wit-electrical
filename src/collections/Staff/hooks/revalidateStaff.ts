import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Staff } from '../../../payload-types'

export const revalidateStaff: CollectionAfterChangeHook<Staff> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/staff/${doc.slug}`

    payload.logger.info(`Revalidating staff at path: ${path}`)

    revalidatePath(path)
    revalidateTag('staff-sitemap')

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      const oldPath = `/staff/${previousDoc.slug}`

      payload.logger.info(`Revalidating old staff at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('staff-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Staff> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/staff/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('staff-sitemap')
  }

  return doc
}
