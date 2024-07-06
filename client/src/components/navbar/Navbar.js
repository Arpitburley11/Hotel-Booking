import { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
export default function Navbar() {

  const { user } = useContext(AuthContext)
  
  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }} ><span className="logo">Hotel_Booking</span></Link>
        {user ? (
          <>
            <div className="hlIcon">
              <FontAwesomeIcon icon={faCircleUser}/>
            </div>
          </>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>)}
      </div>

    </div>
  )
}
