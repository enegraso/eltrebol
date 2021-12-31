import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProductsAdmin, getAllProductsAdmin } from "../../store/actions/products";
import { BiSearchAlt } from "react-icons/bi";
import './searchBarAdmin.css'

export default function SearchBarAdmin() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.query === "") {
        await dispatch(getAllProductsAdmin()); 
    } else {
      await dispatch(searchProductsAdmin(query.query));
/*       setQuery(""); */
    }
  };

  return (
    <section>
      <form className="d-flex barraBuscar" onSubmit={handleSubmit}>
        <input
          class="form-control me-2"
          placeholder="Buscar..."
          aria-label="Search"
          type="search"
          name="query"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline-success"
/*           onClick={handleClick} */
        >
          <BiSearchAlt />
        </button>
      </form>
    </section>
  );
}
