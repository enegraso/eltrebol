import { useEffect} from 'react'
import s from './pruebaCheckout.css';

const PruebaCheckout = ({ productos, data }) => {

 useEffect(()=>{
  const script = document.createElement('script'); //Crea un elemento html script
  
  const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
  attr_data_preference.value = data.id  //Le asigna como valor el id que devuelve MP

  //Agrega atributos al elemento script
  script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  script.setAttributeNode(attr_data_preference)  

  console.log(data)
  
  //Agrega el script como nodo hijo del elemento form
  document.getElementById('form1').appendChild(script)
  return () =>{
    //Elimina el script como nodo hijo del elemento form
    document.getElementById('form1').removeChild(script);
  }
 },[data])


    return(
        <div>

      <form id='form1'>

        <h4>Checkout</h4>
        <div className={s.gridContainer} >  
        {productos.map((producto, i) => {
            return(
                <div className={s.products} key={i}>
                  <div className={s.ul} >
                    <div>Item: {producto.title}</div>
                    <div>Precio {'AR$: ' + producto.price} - Cantidad {producto.quantity}</div>
                  </div>
                </div>   
            )
        })}
        </div>   
      </form>

     </div>
    )
}

export default PruebaCheckout