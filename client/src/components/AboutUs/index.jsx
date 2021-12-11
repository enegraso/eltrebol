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
          <div>
            {!configs.business ? "Chacinados El Trébol" : configs.business}
          </div>
          <div>
            {!configs.slogan ? "Minimercado en tu celu!" : configs.slogan}
          </div>
          <div>
            <button
              className="btn btn-link"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps?q=-35.1314718924284,-60.460068687284924"
                )
              }
            >
              <BsFillGeoAltFill /> Los Claveles 285 - Bragado
            </button>
          </div>          <div>
            {!configs.horario
              ? "Los pedidos están sujetos a horario"
              : configs.horario}
          </div>
        </div>
      </div>
    </>
  );
};

export default AbouUs;
