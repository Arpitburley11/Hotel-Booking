import { Link } from 'react-router-dom'
import './searchItem.css'

export default function SearchItem(props) {
  return (
    <div className='searchItem'> 
        <img src={props.item.photos[0]} alt="" className="siImg" />
        <div className="siDesc">
            <h1 className='siTitle'>{props.item.name}</h1>
            <span className="siDistance">{props.item.distance}</span>
            <span className="siTaxiOp">Free Airport Taxi</span>
            <span className="siSubtitle">Studio apartment with Air Conditioning</span>
            <span className="isFeatures">{props.item.desc}</span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancleOpSubtitle">You can cancle later, so lock in this great price today!</span>
        </div>
        <div className="siDetails">
          {props.item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{props.item.rating}</button>
          </div>}
          <div className="siDetailTexts">
            <span className="siPrice">${props.item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${props.item._id}`} ><button className='siCheckButton'>See Availability</button></Link>
            
          </div>
        </div>
    </div>
  )
}
