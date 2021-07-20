import Image from 'next/image'

export default function Avatar({ name, picture, width, height }) {
    return (
      <div className="flex items-center">
        <Image src={picture} 
        className="w-12 h-12 rounded-full mr-4" 
        alt={name} 
        width= {width}
        height= {height}
        layout="fixed" 
        />
        <div className="text-xl font-bold">{name}</div>
      </div>
    )
  }