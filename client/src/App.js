import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginAdmin from "../src/components/LogInAdmin/Login"


import NavBar from "./components/navBar";
import Home from "./views/home";
import LogIn from "./views/login";
import ProductsAdmin from "./components/productsAdmin/productsAdmin";
import CategoriesAdmin from "./components/CategoriesAdmin/CategoriesAdmin";

function App() {
  return (
    <div className="App">
      <NavBar />
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/login' element={<LogIn/>}/>
         <Route path='/loginadmin' element={<LoginAdmin/>}/>
         <Route path='/admin/products' element={<ProductsAdmin/>}/>
         <Route path='/admin/categories' element={<CategoriesAdmin/>}/>
       </Routes>
    </div>
  );
}

export default App;
