import Image from "next/image"

const myLoader = ({ src, width, quality }) => {
  return `/api/loader?src=${src}&width=${width}&quality=${quality || 75}`
}

export default function Avatar({ name, picture, width, height }) {
    return (
      <div className="flex items-center">
        <Image src={"/img" + picture} 
        loader = {myLoader}
        loading = "lazy"
        placeholder = 'blur'
        className="w-12 h-12 rounded-full mr-4" 
        alt={name} 
        width= {width}
        height= {height}
        />
        <div className="text-xl font-bold">{name}</div>
      </div>
    )
  }