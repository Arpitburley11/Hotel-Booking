import './Home.css'
import Navbar from '../../components/navbar/Navbar.js'
import Header from '../../components/header/Header.js'
import Featured from '../../components/featured/Featured.js'
import PropList from '../../components/propList/PropList.js'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties.js'
import MailList from '../../components/mailList/MailList.js'
import Footer from '../../components/footer/Footer.js'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropList/>
        <h1 className='homeTitle'>Homes guest love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}
