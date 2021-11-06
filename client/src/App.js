import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";


import NavBar from "./components/navBar";
import Home from "./views/home";
import LogIn from "./views/login";

function App() {
  return (
    <div className="App">
      <NavBar />
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<LogIn/>}/>
       </Routes>
    </div>
  );
}

export default App;
