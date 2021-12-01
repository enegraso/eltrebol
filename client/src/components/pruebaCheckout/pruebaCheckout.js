import { useEffect } from "react";
import s from "./pruebaCheckout.css";

const PruebaCheckout = ({ productos, data }) => {
  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    /*     return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    }; */
  }, [data]);

  return (
    <div className={s.gridContainer}>
      <form id="form1">
        <h4>Pagar por MercadoPago</h4>
        <div className={s.gridContainer}>
          <table border="1">
            <tr>
              <td className="titleLines" width="15%">
                Cantidad
              </td>
              <td className="titleLines" width="55%">
                Producto
              </td>
              <td className="titleLines" width="15%">
                PU
              </td>
              <td className="titleLines" width="25%">
                Importe
              </td>
            </tr>
            {productos.map((producto, i) => {
              return (
                <tr key={i}>
                  <td className={s.ul}>{producto.quantity}</td>
                  <td className={s.ul}>{producto.name}</td>
                  <td className={s.ul}>{producto.price}</td>
                  <td className={s.ul}>{producto.quantity * producto.price}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </form>
      Al pagar, su pedido quedará completado
    </div>
  );
};

export default PruebaCheckout;
