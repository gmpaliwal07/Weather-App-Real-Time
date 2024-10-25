// eslint-disable-next-line react/prop-types
const Card = ({title, img, value}) => {
    return(
        <div  className="flex flex-row  items-center space-x-4 py-8 rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 justify-center">
        {img && <img src={img} alt={title} className="w-10 h-10" />}
        <div className="text-left">
          <span className="text-xl font-medium text-text">{title}</span>
          <p className="text-white font-semibold">{value}</p>
        </div>
        </div>
    )
}
export default Card;