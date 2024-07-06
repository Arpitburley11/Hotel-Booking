import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home.js';
import Hotel from './pages/hotel/Hotel.js';
import Hotels from './pages/hotels/Hotels.js';
import Login from './pages/login/Login.js';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels' element={<Hotels/>}/>
      <Route path='/hotels/:id' element={<Hotel/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  );
}

export default App;
