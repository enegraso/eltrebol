
export const orderline = function(array){
    const guestOrder=[]
    const idArr = []
    
    for(let i=0; i<array.length; i++){
        if(idArr.includes(array[i].id)){
            let idProd = array[i].id;
            let salto = array[i].stepunit // linea agregada para ver si toma el aumento de acuerdo a la db
            let orderLine = idArr.indexOf(idProd);
            guestOrder[orderLine].quantity += array[i].stepunit; // cambiamos el 1 x salto para aumentar de acuerdo a la db
        }
        else {
            idArr.push(array[i].id);
            let pushOrderLine = {
                id: array[i].id,
                name: array[i].name,
                image: array[i].image,
                price: array[i].price,
                // Agrego a la orden 2 variables para aumentar y bajar segun pedido de cliente
                stepunit: array[i].stepunit,
                minunit: array[i].minunit,
                quantity: !array[i].minunit // acuerdo a la db
            }
            guestOrder.push(pushOrderLine)
        }
    }
    return guestOrder
}

export const decrease = (array, idProd) => {
    for(let i=0; i < array.length; i++){
        if (array[i].id === idProd){
            array.splice(i, 1) 
            return array
        }
    }
}

export const total = (arr) => {
    let t = 0;

  for (let i = 0; i < arr.length; i++) {

    t += arr[i].quantity*arr[i].price
  }
  return t;
}
