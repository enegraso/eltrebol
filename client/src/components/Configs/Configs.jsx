import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateConfigs } from "../../store/actions/users";
import { Link } from "react-router-dom"
import swal from 'sweetalert2'


export function validate(input) {
    // var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.
  
    let errors = {};
    if (!input.business) {
      errors.business = "Ingrese nombre de empresa";
    }
    if (!input.pricedelivery) {
      errors.business = "Ingrese nombre de empresa";
    }

    return errors;
  }


const Configs = () => {
    

    const dispatch = useDispatch()
    const configsAdmin = useSelector((state) => state.User.configsAdmin);
  
    const [errors, setErrors] = useState({});
    
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

      console.log("USERADMIN", configsAdmin);
      const [input, setInput] = useState({
        business: configsAdmin.business,
        slogan: configsAdmin.slogan,
        messagewaenvio: configsAdmin.messagewaenvio,
        messagewaretira: configsAdmin.messagewaretira,
        horario: configsAdmin.horario,
        deliveryprice: configsAdmin.deliveryprice,
        messagewareject: configsAdmin.messagewareject,
      });

      async function handleSubmit(e) {
        // funcion que debe solicitar usuario logueado
        e.preventDefault();
        const objConfigsUpd = {
          id: configsAdmin.id,
          business: input.business,
          slogan: input.slogan,
          messagewaenvio: input.messagewaenvio,
          messagewaretira: input.messagewaretira,
          horario: input.horario,
          deliveryprice: input.deliveryprice,
          messagewareject: input.messagewareject
        };
        await dispatch(updateConfigs(objConfigsUpd));
        console.log(localStorage.getItem("configUpdated"));
        if (localStorage.getItem("configUpdated") === "true") {
          swal
            .fire({
              title: "Configuración modificada con éxito",
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: `Aceptar`,
              icon: "success",
            })
            .then((respu) => {
              if (respu.isConfirmed) {
                window.history.go(-1);
                localStorage.setItem("configUpdated", false);
              }
            });
        } else {
          swal.fire({
            title: localStorage.getItem("configUpdated"),
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Aceptar`,
            icon: "error",
            // denyButtonText: `Cancelar`,
          });
        }
      }

    if (!localStorage.getItem("userInfo")) return <><Link to='/loginadmin'><h5>Debe estar logueado</h5></Link></>
    
    return <>
      <div className="boxform">
        <h4>Datos de configuracion de la App</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre negocio</label>
            <input
              className={errors.business && "danger"}
              class="form-control"
              type="text"
              placeholder="nombre"
              name="business"
              onChange={handleInputChange}
              value={input.business}
            ></input>
            {errors.business && <p className="danger">{errors.business}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Slogan</label>
            <input
              class="form-control"
              type="text"
              placeholder="slogan de la empresa (si desea)"
              name="slogan"
              onChange={handleInputChange}
              value={input.slogan}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje de envio</label>
            <input
              class="form-control"
              placeholder="mensaje para avisar envio de pedido"
              type="text"
              name="messagewaenvio"
              onChange={handleInputChange}
              value={input.messagewaenvio}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje para retirar</label>
            <input
              class="form-control"
              placeholder="mensaje para avisar retiro de pedido"
              type="text"
              name="messagewaretira"
              onChange={handleInputChange}
              value={input.messagewaretira}
            ></input>
          </div>{" "}
          <div className="mb-3">
            <label className="form-label">Mensaje para rechazar</label>
            <input
              class="form-control"
              type="text"
              placeholder="mensaje para rechazar pedido"
              name="messagewareject"
              onChange={handleInputChange}
              value={input.messagewareject}
            ></input>
          </div>{" "}
          <div className="mb-3">
            <label className="form-label">Horario</label>
            <input
              class="form-control"
              type="text"
              name="horario"
              onChange={handleInputChange}
              value={input.horario}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Precio envío</label>
            <input
              class="form-control"
              type="number"
              name="deliveryprice"
              onChange={handleInputChange}
              value={input.deliveryprice}
            ></input>
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
}

export default Configs