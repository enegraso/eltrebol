import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/users";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

export function validate(input) {
  var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.

  let errors = {};
  if (!input.name) {
    errors.name = "Ingrese nombre de usuario";
  }
  if (input.email.length > 0 && !emailPattern.test(input.email)) {
    errors.email = "Direccion de correo invalido";
  }
  if (!input.oldpassw) {
    errors.oldpassw = "Ingrese contraseña actual";
  } else if (input.oldpassw.length > 0 && input.oldpassw.length < 4) {
    errors.oldpassw = "Mínimo 4 caracteres";
  }
  if (input.password.length > 0 && input.password.length < 4) {
    errors.password = "Contraseña de al menos 4 caracteres";
  } /* else if (!/(?=.*[0-9])/.test(input.password)) {
      errors.password = "Password is invalid";
    } */
  if (input.repasswo.length > 0 && input.password.length === 0) {
    errors.repasswo = "Ingresar contraseña nueva";
  } else if (input.repasswo !== input.password) {
    errors.oldpassw = "Las contraseñas no coinciden";
  }

  return errors;
}

const UserForm = () => {
  const dispatch = useDispatch();
  const userAdmin = useSelector((state) => state.User.userDetail);

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
    const objUserUpd = {
      olduser: userAdmin.username,
      oldpass: input.oldpassw,
      name: input.name,
      newpass: input.password,
      email: input.email,
      token: userAdmin.token,
    };
    await dispatch(updateUser(objUserUpd));
    console.log(localStorage.getItem("userUpdated"));
    if (localStorage.getItem("userUpdated") === "true") {
      swal
        .fire({
          title: "Usuario modificado con éxito",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Aceptar`,
          icon: "success",
        })
        .then((respu) => {
          if (respu.isConfirmed) {
            window.location.href = "/loginadmin";
            localStorage.setItem("userUpdated", false);
          }
        });
    } else {
      swal.fire({
        title: localStorage.getItem("userUpdated"),
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        icon: "error",
        // denyButtonText: `Cancelar`,
      });
    }
  }

  console.log("USERADMIN", userAdmin);
  const [input, setInput] = React.useState({
    oldpassw: "",
    username: "",
    password: "",
    repasswo: "",
    name: userAdmin.name,
    email: userAdmin.email ? userAdmin.email : "",
  });

  if (!localStorage.getItem("userInfo")) return <><Link to='/loginadmin'><h5>Debe estar logueado</h5></Link></>

  if (!userAdmin) return <> Cargando... </>;

  return (
    <>
      <div className="boxform">
        <h4>Modificar datos de usuario: {userAdmin.username}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className={errors.name && "danger"}
              className="form-control"
              type="text"
              placeholder="nombre"
              name="name"
              onChange={handleInputChange}
              value={input.name}
            ></input>
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className={errors.email && "danger"}
              className="form-control"
              type="text"
              placeholder="email (si desea)"
              name="email"
              onChange={handleInputChange}
              value={input.email}
            ></input>
            {errors.email && <p className="danger">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Clave Actual</label>
            <input
              className={errors.oldpassw && "danger"}
              className="form-control"
              type="password"
              name="oldpassw"
              onChange={handleInputChange}
              value={input.oldpassw}
            ></input>
            Necesaria para modificar
            {errors.oldpassw && <p className="danger">{errors.oldpassw}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Clave nueva</label>
            <input
              className={errors.password && "danger"}
              className="form-control"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={input.password}
            ></input>
            {errors.password && <p className="danger">{errors.password}</p>}
          </div>{" "}
          <div className="mb-3">
            <label className="form-label">Reingrese clave</label>
            <input
              className={errors.repasswo && "danger"}
              className="form-control"
              type="password"
              name="repasswo"
              onChange={handleInputChange}
              value={input.repasswo}
            ></input>
            {errors.repasswo && <p className="danger">{errors.repasswo}</p>}
          </div>
          <div className="d-grid gap-1 col-6 mx-auto">
            <button className="btn btn-outline-success" type="submit">
              {" "}
              Modificar{" "}
            </button>
            <button
              className="btn btn-outline-success"
              type="reset"
              onClick={() => {
                window.history.go(-1);
              }}
            >
              {" "}
              Volver{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserForm;
