import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './navBar.css'
import {GiShamrock} from 'react-icons/gi'
import {FaHome} from 'react-icons/fa'
import {BiShoppingBag, BiCategory} from 'react-icons/bi'



export default function NavBar(){
    
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = ()=>setClick(false);

  return(
      <>
      <nav className='navbar'>
          <Link to='/' className='navbar-logo'>
          <GiShamrock style={{'color':'#4AA96C'}}/> El Trebol
          </Link>
          <div className='menu-icon' onClick={handleClick}>
              <i className={click? 'fas fa-times': 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active': 'nav-menu'}>
              <li className='nav-item'>
                  <Link to='/' 
                  className='nav-links btn-outline-success' 
                  onClick={closeMobileMenu}>
                    <FaHome/> Home
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link to='/cart' 
                  className='nav-links btn-outline-success' 
                  onClick={closeMobileMenu}>
                   <BiShoppingBag/> Orden
                  </Link>
              </li>
              <li className='nav-item'>
                <Link to='/category'
                className='nav-links btn-outline-success'
                onClick={closeMobileMenu}
                >
                <BiCategory/>
                Categorias
                </Link>
              </li>
          </ul>
      </nav>
      </>
  )
}

