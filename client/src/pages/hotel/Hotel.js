import './Hotel.css'
import Navbar from '../../components/navbar/Navbar.js'
import Header from '../../components/header/Header.js'
import Footer from '../../components/footer/Footer.js'
import MailList from '../../components/mailList/MailList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.js'
import { AuthContext } from '../../context/AuthContext.js'
import Reserve from '../../components/reserve/Reserve.js'

export default function Hotel() {
  const navigate = useNavigate
  const location = useLocation();
  const id = location.pathname.split("/")[2]

  
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true)
  }
  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 7 ? 0 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 0 ? 7 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  }
  const { user } = useContext(AuthContext)
  const { data, loading } = useFetch(`/hotels/find/${id}`)
  const { dates, options } = useContext(SearchContext)
  
  const s = dates[0].startDate
  const e = dates[0].endDate
  
  // Difference between dates
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; 
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime()-date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(e, s)
  
  // Reserve Button
  
  const [openModal, setOpenModal] = useState(false)
  const handleClick = ()=>{
    if(user){
      setOpenModal(true)
    }
    else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        "Loading..."
      ) : (
        <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => { handleMove("l") }} />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => { handleMove("r") }} />
          </div>}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddres">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">Excellent location - {data.distance}</span>
            <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi.</span>
            <div className="hotelImages">
              {data.photos?.map((photo, index) => (
                <div className="hotelImgWrapper">
                  <img src={photo} alt="" onClick={() => handleOpen(index)} className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Karkow, this property has an excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or book now!</button>
              </div> 
            </div>
          </div>
          <MailList />
          <Footer />
        </div>)}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}
