import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './navBar.css'
import {GiShamrock} from 'react-icons/gi'
import {FaUserCircle, FaHome, FaTimesCircle, FaBars} from 'react-icons/fa'
import {BiShoppingBag} from 'react-icons/bi'



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
              <i className={click? <FaTimesCircle/> : <FaBars/> }/>
          </div>
          <ul className={click ? 'nav-menu active': 'nav-menu'}>
              <li className='nav-item'>
                  <Link to='/' 
                  className='nav-links' 
                  onClick={closeMobileMenu}>
                    <FaHome/> Home
                  </Link>
              </li>
              <li className='nav-item'>
                  <Link to='/cart' 
                  className='nav-links' 
                  onClick={closeMobileMenu}>
                   <BiShoppingBag/> Orden
                  </Link>
              </li>
              <li className='nav-item'>
                <Link to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
                >
                <FaUserCircle/>
                </Link>
              </li>
          </ul>
      </nav>
      </>
  )
}


/* const NavBar=()=>{

    return(
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><GiShamrock style={{'color':'#4AA96C'}}/> El Trebol </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to='/' className='btn btn-light icon'><FaHome/></Link>
          <Link to='login' className='btn btn-light icon'><FaUserCircle/></Link>
          <button className='btn btn-outline-success position-relative icon'>
            <BiShoppingBag/>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{'font-size':'0.4em'}}>
            9+
           <span class="visually-hidden">orders</span>
          </span>
          </button>
          </div>
        </div>
      </nav>
    )
}

export default NavBar; */