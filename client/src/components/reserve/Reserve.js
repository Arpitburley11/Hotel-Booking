import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useContext, useState} from 'react'
import { SearchContext } from '../../context/SearchContext.js'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Reserve(props) {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${props.hotelId}`)
    const { dates } = useContext(SearchContext)
    const navigate = useNavigate();


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())

        let list = []
        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => allDates.includes(new Date(date).getTime()))
        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                const res = axios.put(`/rooms/availability/${roomId}`, { 
                    dates: allDates 
                })})
            )
            props.setOpen(false)
            // navigate('/')
        }
        catch (err) {
        }
    }
    return (
        <div className='reserve'>
            {loading ? ("Loading...") : <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => props.setOpen(false)} />
                <span className='roomTitle'>Select your rooms:</span>
                {data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title} </div>
                            <div className="rDesc">{item.desc} </div>
                            <div className="rMax">Max People: <b>{item.maxPeople} </b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className='roomCheckBox'>
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserv Now!!!</button>
            </div>}
        </div>
    )
}
