import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUser, getConfig } from "../../store/actions/users";
import { Link } from "react-router-dom";
import "./login.css";
import Dashboard from "../../views/admin/dashboard";
import { FaUserCircle } from "react-icons/fa";
import swal from "sweetalert2";

export function validate(input) {
  var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.

  let errors = {};
  if (!input.username) {
    errors.username = "Ingrese nombre de usuario";
  } /* else if (!emailPattern.test(input.username)) {
    errors.username = "Username is invalid";
  } */
  if (!input.password) {
    errors.password = "Ingresar contraseña";
  } else if (input.password.length < 4) {
    errors.password = "Al menos 4 caracteres";
  } /* else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = "Password is invalid";
  } */

  return errors;
}

function LoginAdmin(props) {
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    // validate(e.target.name,e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  async function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    await props.getUser(input.username, input.password);
    await props.getConfig(1)
    if (!localStorage.getItem("userInfo")) {
      swal.fire({
        title: "No se puede acceder con ese usuario/contraseña",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        icon: "error",
        // denyButtonText: `Cancelar`,
      });
    }
  }

  /*  if (props.userDetail.token) return <Dashboard />  */

  if (props.userDetail.token) {
    return <Dashboard />;
  }

  return (
    // formulario para loguearse al sistema
    <div className="container-sm">
      {/*  <div className="boxteam"> */}
      <div className="titteam">
        <FaUserCircle />
        Login
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className={errors.username && "danger"}
            class="form-control"
            type="text"
            placeholder="usuario"
            name="username"
            onChange={handleInputChange}
            value={input.username}
          ></input>
          {errors.username && <p className="danger">{errors.username}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Clave</label>
          <input
            className={errors.password && "danger"}
            class="form-control"
            type="password"
            name="password"
            onChange={handleInputChange}
            value={input.password}
          ></input>
          {errors.password && <p className="danger">{errors.password}</p>}
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-outline-success" type="submit">
            {" "}
            Entrar{" "}
          </button>
        </div>
      </form>
      {/*         <div id="regis" className="logsub">
          <Link to={linkto}>{texto}</Link> 
        </div> */}
      {/*      </div> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userDetail: state.User.userDetail,
    configsAdmin: state.User.configsAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (name, clave) => dispatch(getUser(name, clave)),
    getConfig: (id) => dispatch(getConfig(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);
