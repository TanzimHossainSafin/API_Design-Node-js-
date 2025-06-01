import Footer from './components/dashboard/footer';
import Navbar from './components/dashboard/navbar';
import Signup from './components/signup';
import Login from './components/login';
import Restaurant from './components/restaurant';
import HomePage from './components/homePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 bg-gray-900 text-white">
        <Navbar/>
        <div className="flex-1">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurant" element={<Restaurant/>}/>
            <Route path="/" element={<HomePage/>} />
            <Route path="/restaurant" element={<Restaurant/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}
export default App
