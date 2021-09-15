

export default function Avatar({ name, picture, width, height }) {
    return (
      <div className="flex items-center">
        <img src={"/img" + picture} 
        className="w-12 h-12 rounded-full mr-4" 
        alt={name} 
        width= {width}
        height= {height}
        />
        <div className="text-xl font-bold">{name}</div>
      </div>
    )
  }