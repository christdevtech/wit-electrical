import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Partner } from '../../../payload-types'

export const revalidatePartner: CollectionAfterChangeHook<Partner> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/partners/${doc.slug}`

    payload.logger.info(`Revalidating partner at path: ${path}`)

    revalidatePath(path)
    revalidateTag('partners-sitemap')

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      const oldPath = `/partners/${previousDoc.slug}`

      payload.logger.info(`Revalidating old partner at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('partners-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Partner> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/partners/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('partners-sitemap')
  }

  return doc
}
