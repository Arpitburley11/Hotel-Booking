import './List.css'
import Header from '../../components/header/Header.js'
import Navbar from '../../components/navbar/Navbar.js'
import SearchItem from '../../components/searchItem/SearchItem.js'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import useFetch from '../../hooks/useFetch'

export default function Hotels() {
  const location = useLocation();
  console.log(location)
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [options, setOptions] = useState(location.state.options)
  const [openDate, setOpenDate] = useState(false)
  // Min & Max Price
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min||0}&max=${max||999}`)
  const handleClickSearch = ()=>{
    reFetch()
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label >Destination</label>
              <input type='text' placeholder={destination} />
            </div>
            <div className="lsItem">
              <label >Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && < DateRange
                onChange={item => setDates([item.selection])} lsOptionInput
                ranges={dates}
                minDate={new Date()}
              />}
            </div>
            <div className="lsitem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min Price <small>per nigth</small></span>
                  <input type="number" min={0} onChange={(e)=>setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max Price <small>per nigth</small></span>
                  <input type="number" min={0} onChange={(e)=>setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adults</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Childrens</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Rooms</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClickSearch}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : (
              <>
              {data.map((item)=>(
                <SearchItem item={item} key={item._id} />
              ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
