import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {searchProducts} from '../../store/actions/products';
import {BiSearchAlt} from 'react-icons/bi'

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
            <button type='submit' className="btn btn-outline-success" style={{paddingleft:'10px'}} /* onClick={handleClick} */><BiSearchAlt/></button>
        </form>
        </section>
    )
}