import React from "react";
import { connect } from "react-redux";
import { getUser } from "../../store/actions/users";
import { Link } from "react-router-dom";
import "./login.css";
import Dashboard from "../../views/admin/dashboard";
import { FaUserCircle } from "react-icons/fa";

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

  function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    props.getUser(input.username, input.password);
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  if (props.userDetail.token) return <Dashboard />;

  var texto, linkto;
  if (props.login) {
    texto = "Registro OK y ACTIVO. Ahora debes loguearte!";
    linkto = "";
  } else {
    texto = "Registrate! Es fácil y gratis";
    linkto = "/register";
  }

  return (
    // formulario para loguearse al sistema
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Login
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
          </div>
          <div>
            <input
              className={errors.username && "danger"}
              type="text"
              placeholder="usuario"
              name="username"
              onChange={handleInputChange}
              value={input.username}
            ></input>
            {errors.username && <p className="danger">{errors.username}</p>}
          </div>
          <div>
            <label>Clave</label>
          </div>
          <div>
            <input
              className={errors.password && "danger"}
              type="password"
              name="password"
              onChange={handleInputChange}
              value={input.password}
            ></input>
            {errors.password && <p className="danger">{errors.password}</p>}
          </div>
          <div>
            <button type="submit">Entrar</button>
          </div>
        </form>
        <div id="regis" className="logsub">
          {/*  <Link to={linkto}>{texto}</Link> */}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userDetail: state.userDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: (name, clave) => dispatch(getUser(name, clave)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);
