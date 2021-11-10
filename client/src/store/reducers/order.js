const initialState = {
    allOrders:[],
    orderAdmin: {},
    orderLineAdmin: [],
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
        default: return state;
    }
}
