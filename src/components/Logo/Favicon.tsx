import Link from 'next/link'

export const Favicon = () => {
  return (
    <Link href="/" className="block">
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/favicon.png"
        alt="Favicon"
        width={193}
        height={34}
        decoding="async"
        className="max-w-[9.375rem] w-full h-[34px]"
      />
    </Link>
  )
}
