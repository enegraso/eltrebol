import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './navBar.css';
import {GiShamrock} from 'react-icons/gi';
import {FaHome} from 'react-icons/fa';
import {BiCategory} from 'react-icons/bi';
import {MdShoppingCart} from 'react-icons/md';
import { useSelector } from 'react-redux'


export default function NavBar(){
  const elementCart = useSelector((state) => state.Carrito.guestCart)
  const [itemsCart, setItemsCart] = useState(0)

  useEffect(() => {
    setItemsCart(elementCart.length)
    // Preparo items 
  },[elementCart])


  
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = ()=>setClick(false);

  return(
      <>
      <nav className='navbar'>
          <Link to='/' className='navbar-logo'>
          <GiShamrock style={{'color':'#4AA96C'}}/> Chacinados El Trebol
          </Link>
          <div className='menu-icon' onClick={handleClick}>
              <i className={click? 'fas fa-times': 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active': 'nav-menu'}>
              <li className='nav-item'>
                  <Link to='/' 
                  className='nav-links btn-outline-success' 
                  onClick={closeMobileMenu}>
                    <FaHome/>
                  </Link>
              </li>
              <li className='nav-item'>
                <Link to='/category'
                className='nav-links btn-outline-success'
                onClick={closeMobileMenu}
                >
                <BiCategory/>
                </Link>
              </li>
              <li className='nav-item'>
                  <Link to='/carrito' 
                  className='nav-links btn-outline-success' 
                  onClick={closeMobileMenu}>
                   <MdShoppingCart/>
                   <span class="badge bg-danger">{ itemsCart > 0 ? itemsCart : "" }</span>
                  </Link>
              </li>
          </ul>
      </nav>
      </>
  )
}

