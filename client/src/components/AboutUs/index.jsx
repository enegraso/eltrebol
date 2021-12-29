import { BsFillGeoAltFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Spinner from "../spinner";
import "./index.css";

const AbouUs = () => {
  const configs = useSelector((state) => state.User.configsAdmin);

  if (!configs)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <>
      <div className="fondo">
        <div>
          <h5 style={{'fontWeight':'600'}}>
            {!configs.business ? "Chacinados El Trébol" : configs.business}
          </h5>
          <h6 style={{'fontWeight':'300'}}>
            {!configs.slogan ? "Minimercado en tu celu!" : configs.slogan}
          </h6>
          <div>
            <button
              className="btn btn-link letra"
              style={{'textDecoration':'none'}}
              onClick={() =>{
                window.open(
                  "https://www.google.com/maps?q=-35.1314718924284,-60.460068687284924"
                )
              }
              }
            >
              <BsFillGeoAltFill /> Los Claveles 285 - Bragado
            </button>
          </div>          
{/*           <h6 style={{'fontWeight':'300'}}>
            {!configs.horario
              ? "Los pedidos están sujetos a horario"
              : configs.horario}
          </h6> */}
        </div>
      </div>
    </>
  );
};

export default AbouUs;
