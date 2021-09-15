import cn from 'classnames'
import Link from 'next/link'
import Image from "next/image"

const myLoader = ({ src, width, quality }) => {
  return `/api/loader?src=${src}&width=${width}&quality=${quality || 75}`
}

export default function CoverImage({ title, src, slug, height, width }) {
  const image = (
    <Image
      src={"/img" + src}
      alt={`Cover Image for ${title}`}
      loader= {myLoader}
      loading = "lazy"
      placeholder = 'blur'
      className={cn('shadow-sm', {
        'hover:shadow-md transition-shadow duration-200': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}