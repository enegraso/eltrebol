import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {searchProducts} from '../../store/actions/products';
import {FaSearch} from 'react-icons'

export default function SearchBar(){

/*     const [query, setQuery] = useState('')
    const dispatch = useDispatch();

    const handleChange=(e)=>{
        setQuery({
            [e.target.name] : e.target.value
        })
    }
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(searchProducts(query.query))
        setQuery('');   
      }  

 */
    return(
        <section>
        <form className='d-flex' style={{margin:'50px'}}>
            <input
              class='form-control me-2'
              placeholder='Search'
              aria-label='Search'
              type='search'
              name='query'
              //onChange={handleChange}
            />
            <button type='submit' className="btn btn-outline-success" style={{paddingleft:'10px'}} /* onClick={handleClick} */><FaSearch/></button>
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
        </form>
        </section>
    )
}