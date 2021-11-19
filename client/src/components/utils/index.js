
export const orderline = function(array){
    const guestOrder=[]
    const idArr = []
    
    for(let i=0; i<array.length; i++){
        if(idArr.includes(array[i].id)){
            let idProd = array[i].id;
            let orderLine = idArr.indexOf(idProd);
            guestOrder[orderLine].quantity +=1;
        }
        else {
            idArr.push(array[i].id);
            let pushOrderLine = {
                id: array[i].id,
                name: array[i].name,
                image: array[i].image,
                price: array[i].price,
                quantity: 1
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