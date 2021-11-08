const initialState = {
    allOrders:[],
};

export default function orderReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_ORDERS':
            return{
                ...state,
                allOrders: action.payload,
            }
        default: return state;
    }
}
