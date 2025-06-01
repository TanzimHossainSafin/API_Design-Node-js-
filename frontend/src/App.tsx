
import Signup from './components/signup';
import Login from './components/login';
import Restaurant from './components/restaurant';
import './App.css'


function App() {


  return (
    <>
      <Signup/>
      <Login/>
      <div>
        <h1>Restaurant</h1>
        <Restaurant/>
      </div>
    </>
  )
}

export default App
