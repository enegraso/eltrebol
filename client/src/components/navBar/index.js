import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
/* import './navBar.css'; */
import './nav.css';
import {GiShamrock} from 'react-icons/gi';
import {FaHome, FaUserCircle } from 'react-icons/fa';
import {MdShoppingCart} from 'react-icons/md';
import { useSelector } from 'react-redux';
import shoppingBag from '../utils/img/shopping-bag.png';
import Carrito from '../../views/carrito'


export default function NavBar(){
  const elementCart = useSelector((state) => state.Carrito.guestCart)
  const [itemsCart, setItemsCart] = useState(0)

  useEffect(() => {
    setItemsCart(elementCart.length)
    // Preparo items 
  },[elementCart])


  return(
      <>
      <nav className='navbar bg-fade fixed-top'>
        <div className='container-fluid'>

          <Link to='/' className='navbar-logo'>
          <GiShamrock className='sham'/> El Trebol
          </Link>

          <div className='userAdminLink' type='button'>
          { localStorage.getItem("allowLogin") == "si" ? 
             <Link 
             to='/loginadmin' 
             className='btn-outline-success' 
              > <FaUserCircle /> </Link>
              : ""
          }
          </div>

          <div className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <MdShoppingCart/>
          <span className="badge bg-danger">{ itemsCart > 0 ? itemsCart : "" }</span>
          </div>
          
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          
          <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{ itemsCart > 0 ? itemsCart : "" } Items</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {
        itemsCart == 0 ? 
        <div>
        <img className='shopBagImg' src={shoppingBag} alt='Continue Shopping'/>
        <h5 style={{'color':'gray'}}>Tu bolsa de compras esta vacia</h5>
        </div>
        : <Carrito/>
        }
      </div>
    </div>

        </div>
      </nav>
      </>
  )
}

