import React from 'react';
import {Link} from 'react-router-dom';
import './navBar.css'
import {GiShamrock} from 'react-icons/gi'
import {FaUserCircle, FaHome} from 'react-icons/fa'
import {BiShoppingBag} from 'react-icons/bi'


const NavBar=()=>{

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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorias
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}

export default NavBar;