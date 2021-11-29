const initialState = {
    allOrders:[],
    orderAdmin: {},
    orderLineAdmin: [],
    orderGuest: {},
    orderId:0
};

export default function orderReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_ORDERS':
            return{
                ...state,
                allOrders: action.payload,
            }
        case 'GET_ORDER_ADMIN':
            return{
                ...state,
                orderAdmin: action.payload
            }
        case 'GET_ORDER':
            return{
                ...state,
                orderGuest: action.payload
            }
        case 'ADD_ORDER':
            return{
                ...state,
                orderId: action.payload
            }

        default: return state;
    }
}
