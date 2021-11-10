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
import ProductForm from "./components/productsAdmin/ProductForm";
import CategoryForm from "./components/CategoriesAdmin/CategoryForm";
import ProductFormMod from "./components/productsAdmin/ProductFormMod";
import OrderAdmin from "./components/OrdersAdmin/OrderAdmin";

function App() {
  return (
    <div className="App">
      <NavBar />
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/login' element={<LogIn/> }/>
         <Route path='/loginadmin' element={<LoginAdmin/>} />
         <Route path='/admin/products' element={<ProductsAdmin/>} />
         <Route path='/admin/categories' element={<CategoriesAdmin/>} />
         <Route path='/admin/addproduct' element={<ProductForm />} />
         <Route path='/admin/modproduct/:id' element={ <ProductFormMod />} />
         <Route path='/admin/addcategory' element={<CategoryForm />}/>
         <Route path='/admin/order/:id' element={<OrderAdmin />}/>
       </Routes>
    </div>
  );
}

export default App;
