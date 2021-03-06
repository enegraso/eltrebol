import "./App.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./views/home";
import Category from "./views/category";
import ProductsAdmin from "./components/productsAdmin/productsAdmin";
import CategoriesAdmin from "./components/CategoriesAdmin/CategoriesAdmin";
import ProductForm from "./components/productsAdmin/ProductForm";
import CategoryForm from "./components/CategoriesAdmin/CategoryForm";
import ProductFormMod from "./components/productsAdmin/ProductFormMod";
import OrderAdmin from "./components/OrdersAdmin/OrderAdmin";
import LoginAdmin from "./components/LogInAdmin/Login";
import DeleteProduct from "./components/productsAdmin/DeleteProduct";
import ImageProduct from "./components/productsAdmin/ImageProduct";
import DeleteCategory from "./components/CategoriesAdmin/DeleteCategory";
import UserForm from "./components/UserAdmin/UserForm";
import CategoryFormMod from "./components/CategoriesAdmin/CategoryFormMod";
import Paso1 from "./components/checkout/paso1";
import Paso2 from "./components/checkout/paso2";
import OrderAdminProcess from "./components/OrdersAdmin/OrderAdminProcess";
import OrderAdminFinish from "./components/OrdersAdmin/OrderAdminFinish";
import Configs from "./components/Configs/Configs";
import Efectivo from './components/checkout/efectivo';
import Success from './components/checkout/success'



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/paso1" element={<Paso1/>}/>
        <Route path="/paso2" element={<Paso2/>}/>
        <Route path="/checkout" element={<Efectivo/>}/>
        <Route path="/success" element={<Success /> } />
        <Route path="/admin/products" element={<ProductsAdmin />} />
        <Route path="/admin/categories" element={<CategoriesAdmin />} />
        <Route path="/admin/addimageprod" element={<ImageProduct />} />
        <Route path="/admin/addproduct" element={<ProductForm />} />
        <Route path="/admin/modproduct" element={<ProductFormMod />} />
        <Route path="/admin/delproduct" element={<DeleteProduct />} />
        <Route path="/admin/addcategory" element={<CategoryForm />} />
        <Route path="/admin/modcategory" element={<CategoryFormMod />} />
        <Route path="/admin/delcategory" element={<DeleteCategory />} />
        <Route path="/admin/order/:id" element={<OrderAdmin />} />
        <Route path="/admin/orderprocess/:id" element={<OrderAdminProcess />} />
        <Route path="/admin/orderdelivered/:id" element={<OrderAdminFinish />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/admin/user" element={<UserForm />} />
        <Route path="/admin/configs" element={<Configs /> } />
      </Routes>
    </div>
  );
}

export default App;
